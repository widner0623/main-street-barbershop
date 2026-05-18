import express from "express";
import Booking from "../models/Booking.js";
import { Resend } from "resend";
import {
  checkCalendarAvailability,
  createCalendarEvent,
} from "../utils/googleCalendar.js";

const router = express.Router();
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const getServiceDuration = (service) => {
  const durations = {
    "Classic Haircut": 30,
    "Precision Fade": 45,
    "Beard Sculpting": 30,
    "Straight Razor Shave": 40,
    "Kids Cut": 20,
    "The Executive": 90,
  };

  return durations[service] || 60;
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
      appointmentDate: startDate,
      barber: barber || "Any Barber",
      status: { $ne: "cancelled" },
    });

    if (existingBooking) {
      return res.status(409).json({
        message: "That time slot is already booked.",
      });
    }

    const calendarAvailability = await checkCalendarAvailability({
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
    });

    if (!calendarAvailability.isAvailable) {
      return res.status(409).json({
        message: "That time is unavailable on the shop calendar.",
      });
    }

    const calendarEvent = await createCalendarEvent({
      customerName,
      email,
      phone,
      service,
      barber,
      notes,
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
    });

    const booking = new Booking({
      customerName,
      email,
      phone,
      service,
      appointmentDate: startDate,
      duration,
      barber: barber || "Any Barber",
      notes,
      status: "confirmed",
      googleEventId: calendarEvent?.id || null,
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
      calendarConfigured: calendarAvailability.configured,
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