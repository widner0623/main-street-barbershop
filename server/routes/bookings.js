// server/routes/bookings.js
import express from "express";
import Booking from "../models/Booking.js";
import { Resend } from "resend";
import { squareServiceMap, squareBarberMap } from "../config/squareMappings.js";
import squareClient from "../utils/squareClient.js";

const router = express.Router();

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Get service duration
const getServiceDuration = (service) => squareServiceMap[service]?.duration || 30;

router.post("/", async (req, res) => {
  try {
    const { customerName, email, phone, service, appointmentDate, barber, notes } = req.body;

    // Validate inputs
    if (!customerName || !email || !phone || !service || !appointmentDate) {
      return res.status(400).json({ message: "Missing required booking information." });
    }

    if (!squareServiceMap[service]) {
      return res.status(400).json({ message: "Invalid service selected." });
    }

    if (barber && !squareBarberMap[barber] && barber !== "Any Barber") {
      return res.status(400).json({ message: "Invalid barber selected." });
    }

    const startDate = new Date(appointmentDate);
    if (Number.isNaN(startDate.getTime())) {
      return res.status(400).json({ message: "Invalid appointment date." });
    }

    const duration = getServiceDuration(service);
    const endDate = new Date(startDate.getTime() + duration * 60 * 1000);

    // Day range for Mongo query
    const startOfDay = new Date(startDate); startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startDate); endOfDay.setHours(23, 59, 59, 999);

    // Check overlapping bookings
    const existingBookings = await Booking.find({
      barber: barber || "Any Barber",
      appointmentDate: { $gte: startOfDay, $lte: endOfDay },
      status: { $ne: "cancelled" },
    });

    const overlappingBooking = existingBookings.find(b => {
      const bookingStart = new Date(b.appointmentDate);
      const bookingEnd = new Date(bookingStart.getTime() + b.duration * 60 * 1000);
      return startDate < bookingEnd && endDate > bookingStart;
    });

    if (overlappingBooking) {
      return res.status(409).json({ message: "That time slot is already booked. Please choose another time." });
    }

    // Save in MongoDB
    const booking = new Booking({
      customerName, email, phone, service, appointmentDate: startDate,
      duration, barber: barber || "Any Barber", notes, status: "pending", squareBookingId: null,
    });

    await booking.save();

    // Push to Square
    if (process.env.SQUARE_ACCESS_TOKEN) {
      try {
       const locationsResult = await squareClient.locations.list();
       const locationId = locationsResult.locations?.[0]?.id;

       const teamMemberId =
        barber && squareBarberMap[barber]
          ? squareBarberMap[barber]
          : undefined;

      if (locationId) {
        const squareResult = await squareClient.bookings.create({
          idempotencyKey: booking._id.toString(),
          booking: {
            locationId,
            startAt: startDate.toISOString(),
            appointmentSegments: [
              {
                serviceVariationId: squareServiceMap[service].variationId,
                serviceVariationVersion: squareServiceMap[service].version,
                teamMemberId,
                durationMinutes: duration,
              },
            ],
          },
        });

        booking.squareBookingId = squareResult.booking?.id || null;
        await booking.save();
      }
      } catch (squareError) {
        console.error("Square booking error:", squareError);
      }
    }

    // Send confirmation email
    if (resend) {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: `Appointment Request Received - ${service}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Main Street Barbershop</h2>
            <p>Hi ${customerName},</p>
            <p>Your appointment request has been received.</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Barber:</strong> ${barber || "Any Barber"}</p>
            <p><strong>Date/Time:</strong> ${startDate.toLocaleString()}</p>
            <p>The shop will confirm your appointment as soon as possible.</p>
          </div>
        `,
      });
    }

    res.status(201).json({
      message: "Booking created successfully.",
      booking,
      squareBookingId: booking.squareBookingId,
    });
  } catch (err) {
    console.error("Booking error:", err);
    if (err.code === 11000) {
      return res.status(409).json({ message: "That time slot was just booked. Please choose another time." });
    }
    res.status(500).json({ message: "Unable to create booking." });
  }
});

export default router;