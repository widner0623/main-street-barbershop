import express from "express";
import Booking from "../models/Booking.js";
import { Resend } from "resend";

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

// Create a booking
router.post("/", async (req, res) => {
  try {
    const { customerName, email, phone, service, appointmentDate, barber, notes } = req.body;

    // TODO: check availability on Google Calendar here later

    const booking = new Booking({
      customerName,
      email,
      phone,
      service,
      appointmentDate,
      barber,
      notes,
    });

    await booking.save();

    // Optional: send email notification using Resend
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: `Booking Confirmation - ${service}`,
      html: `<p>Hi ${customerName},</p>
             <p>Your booking for <strong>${service}</strong> on <strong>${new Date(appointmentDate).toLocaleString()}</strong> is confirmed!</p>
             <p>Thank you for choosing Main Street Barbershop.</p>`,
    });

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;