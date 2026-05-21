import express from "express";
import Booking from "../models/Booking.js";
import { Resend } from "resend";
import { squareServiceMap, squareBarberMap } from "../config/squareMappings.js";
import squareClient from "../utils/squareClient.js";

const router = express.Router();

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Get duration for a service from squareServiceMap
const getServiceDuration = (service) => {
  return squareServiceMap[service]?.duration || 30;
};

router.post("/", async (req, res) => {
  try {
    const { customerName, email, phone, service, appointmentDate, barber, notes } = req.body;

    if (!customerName || !email || !phone || !service || !appointmentDate) {
      return res.status(400).json({
        message: "Missing required booking information.",
      });
    }

    if (!Object.keys(squareServiceMap).includes(service)) {
      return res.status(400).json({ message: "Invalid service selected." });
    }

    if (barber && !Object.keys(squareBarberMap).includes(barber) && barber !== "Any Barber") {
      return res.status(400).json({ message: "Invalid barber selected." });
    }

    const startDate = new Date(appointmentDate);
    if (Number.isNaN(startDate.getTime())) {
      return res.status(400).json({ message: "Invalid appointment date." });
    }

    const duration = getServiceDuration(service);
    const endDate = new Date(startDate.getTime() + duration * 60 * 1000);

    // Set start and end of the day for querying MongoDB
    const startOfDay = new Date(startDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(startDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Fetch existing bookings for that barber and day
    const existingBookings = await Booking.find({
      barber: barber || "Any Barber",
      appointmentDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      status: { $ne: "cancelled" },
    });

    // Check for overlapping bookings based on duration
    const overlappingBooking = existingBookings.find((booking) => {
      const bookingStart = new Date(booking.appointmentDate);
      const bookingEnd = new Date(bookingStart.getTime() + booking.duration * 60 * 1000);
      return startDate < bookingEnd && endDate > bookingStart;
    });

    if (overlappingBooking) {
      return res.status(409).json({
        message: "That time slot is already booked. Please choose another time.",
      });
    }

    // Save booking in MongoDB
    const booking = new Booking({
      customerName,
      email,
      phone,
      service,
      appointmentDate: startDate,
      duration,
      barber: barber || "Any Barber",
      notes,
      status: "pending",
      squareBookingId: null,
    });

    await booking.save();

    // Push booking to Square
    if (process.env.SQUARE_ACCESS_TOKEN) {
      try {
        const { result: locationsResult } = await squareClient.locationsApi.listLocations();
        const locationId = locationsResult.locations?.[0]?.id;

        const teamMemberId =
          barber && squareBarberMap[barber] ? squareBarberMap[barber] : null;

        if (locationId) {
          const body = {
            idempotencyKey: booking._id.toString(),
            locationId,
            customerId: null,
            startAt: startDate.toISOString(),
            appointmentSegments: [
              {
                serviceVariationId: squareServiceMap[service].variationId,
                teamMemberId: teamMemberId || undefined,
                durationMinutes: duration,
              },
            ],
          };

          const { result: squareResult } = await squareClient.appointmentsApi.createAppointment(body);
          booking.squareBookingId = squareResult.appointment?.id || null;
          await booking.save();
        }
      } catch (squareError) {
        console.error("Square booking error:", squareError);
        // Optionally log or continue without breaking the request
      }
    }

    // Optional: send confirmation email
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
      return res.status(409).json({
        message: "That time slot was just booked. Please choose another time.",
      });
    }

    res.status(500).json({
      message: "Unable to create booking.",
    });
  }
});

export default router;