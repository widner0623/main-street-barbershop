import express from "express";
import Booking from "../models/Booking.js";
import { Resend } from "resend";
import { squareServiceMap, squareBarberMap } from "../config/squareMappings.js";
import squareClient from "../utils/squareClient.js";

const router = express.Router();

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const getServiceDuration = (service) => squareServiceMap[service]?.duration || 30;

const reverseBarberMap = Object.fromEntries(
  Object.entries(squareBarberMap).map(([name, id]) => [id, name])
);

router.post("/", async (req, res) => {
  try {
    const { customerName, email, phone, service, appointmentDate, barber, notes } = req.body;

    if (!customerName || !email || !phone || !service || !appointmentDate) {
      return res.status(400).json({ message: "Missing required booking information." });
    }

    if (!squareServiceMap[service]) {
      return res.status(400).json({ message: "Invalid service selected." });
    }

    if (barber && !squareBarberMap[barber] && barber !== "Any Barber") {
      return res.status(400).json({ message: "Invalid barber selected." });
    }

    const serviceInfo = squareServiceMap[service];

    if (!serviceInfo.variationId) {
      return res.status(400).json({ message: "Missing Square service variation ID." });
    }

    if (!serviceInfo.version) {
      return res.status(400).json({
        message: "Missing Square service variation version. Update squareMappings.js.",
      });
    }

    const startDate = new Date(appointmentDate);

    if (Number.isNaN(startDate.getTime())) {
      return res.status(400).json({ message: "Invalid appointment date." });
    }

    const duration = getServiceDuration(service);
    const endDate = new Date(startDate.getTime() + duration * 60 * 1000);

    const startOfDay = new Date(startDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(startDate);
    endOfDay.setHours(23, 59, 59, 999);

    const mongoQuery = {
      appointmentDate: { $gte: startOfDay, $lte: endOfDay },
      status: { $ne: "cancelled" },
    };

    if (barber && barber !== "Any Barber") {
      mongoQuery.barber = barber;
    }

    const existingBookings = await Booking.find(mongoQuery);

    const overlappingBooking = existingBookings.find((b) => {
      const bookingStart = new Date(b.appointmentDate);
      const bookingEnd = new Date(bookingStart.getTime() + b.duration * 60 * 1000);

      return startDate < bookingEnd && endDate > bookingStart;
    });

    if (overlappingBooking) {
      return res.status(409).json({
        message: "That time slot is already booked. Please choose another time.",
      });
    }

    let squareBookingId = null;
    let finalTeamMemberId = barber && squareBarberMap[barber] ? squareBarberMap[barber] : null;
    let finalBarberName = barber || "Any Barber";

    if (process.env.SQUARE_ACCESS_TOKEN) {
      try {
        const locationsResult = await squareClient.locations.list();
        const locationId = locationsResult.locations?.[0]?.id;

        if (!locationId) {
          return res.status(500).json({ message: "Square location was not found." });
        }

        const teamMemberIds =
          barber && barber !== "Any Barber"
            ? [squareBarberMap[barber]]
            : Object.values(squareBarberMap);

        const availabilityResult = await squareClient.bookings.searchAvailability({
          query: {
            filter: {
              startAtRange: {
                startAt: startOfDay.toISOString(),
                endAt: endOfDay.toISOString(),
              },
              locationId,
              segmentFilters: [
                {
                  serviceVariationId: serviceInfo.variationId,
                  teamMemberIdFilter: {
                    any: teamMemberIds,
                  },
                },
              ],
            },
          },
        });

        const matchingSlot = (availabilityResult.availabilities || []).find((slot) => {
          const slotStart = new Date(slot.startAt);
          return slotStart.getTime() === startDate.getTime();
        });

        if (!matchingSlot) {
          return res.status(409).json({
            message: "That time is no longer available in Square. Please choose another time.",
          });
        }

        finalTeamMemberId =
          matchingSlot.appointmentSegments?.[0]?.teamMemberId || finalTeamMemberId;

        if (!finalTeamMemberId) {
          return res.status(409).json({
            message: "No barber is available for that time.",
          });
        }

        finalBarberName = reverseBarberMap[finalTeamMemberId] || barber || "Any Barber";

        const nameParts = customerName.trim().split(" ");
        const givenName = nameParts[0];
        const familyName = nameParts.slice(1).join(" ") || undefined;

        const customerResult = await squareClient.customers.create({
          idempotencyKey: `${Date.now()}-customer-${Math.random().toString(36).slice(2)}`,
          givenName,
          familyName,
          emailAddress: email,
          phoneNumber: phone,
        });

        const squareCustomerId = customerResult.customer?.id;

        if (!squareCustomerId) {
          return res.status(500).json({
            message: "Unable to create Square customer.",
          });
        }

        const squareResult = await squareClient.bookings.create({
          idempotencyKey: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          booking: {
            customerId: squareCustomerId,
            locationId,
            startAt: startDate.toISOString(),
            appointmentSegments: [
              {
                serviceVariationId: serviceInfo.variationId,
                serviceVariationVersion: BigInt(serviceInfo.version),
                teamMemberId: finalTeamMemberId,
                durationMinutes: duration,
              },
            ],
          },
        });

        squareBookingId = squareResult.booking?.id || null;
      } catch (squareError) {
        console.error("Square booking error:", squareError);
        return res.status(500).json({
          message: "Unable to create booking in Square.",
        });
      }
    }

    const booking = new Booking({
      customerName,
      email,
      phone,
      service,
      appointmentDate: startDate,
      duration,
      barber: finalBarberName,
      notes,
      status: "pending",
      squareBookingId,
    });

    await booking.save();

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
            <p><strong>Barber:</strong> ${finalBarberName}</p>
            <p><strong>Date/Time:</strong> ${startDate.toLocaleString()}</p>
            <p>The shop will confirm your appointment as soon as possible.</p>
          </div>
        `,
      });
    }

    res.status(201).json({
      message: "Booking created successfully.",
      booking,
      squareBookingId,
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