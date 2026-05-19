import express from "express";
import Booking from "../models/Booking.js";
import { Resend } from "resend";
import { squareServiceMap } from "../config/squareMappings.js";

const router = express.Router();

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const getServiceDuration = (service) => {
  return squareServiceMap[service]?.duration || 30;
};

router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      service,
      appointmentDate,
      barber,
      notes,
    } = req.body;

    if (!customerName || !email || !phone || !service || !appointmentDate) {
      return res.status(400).json({
        message: "Missing required booking information.",
      });
    }

    const startDate = new Date(appointmentDate);

    if (Number.isNaN(startDate.getTime())) {
      return res.status(400).json({
        message: "Invalid appointment date.",
      });
    }

    const duration = getServiceDuration(service);
    const endDate = new Date(startDate.getTime() + duration * 60 * 1000);

    const existingBooking = await Booking.findOne({
      appointmentDate: {
        $gte: startDate,
        $lt: endDate,
      },
      barber: barber || "Any Barber",
      status: { $ne: "cancelled" },
    });

    if (existingBooking) {
      return res.status(409).json({
        message: "That time slot was just booked. Please choose another time.",
      });
    }

    // TODO:
    // Once Square credentials + service/team IDs are available,
    // this is where we will create the real Square booking.

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
      squareConfigured: Boolean(process.env.SQUARE_ACCESS_TOKEN),
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