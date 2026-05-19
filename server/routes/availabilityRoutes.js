import express from "express";
import Booking from "../models/Booking.js";
import { squareServiceMap } from "../config/squareMappings.js";

const router = express.Router();

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

const getServiceDuration = (service) => {
  return squareServiceMap[service]?.duration || 30;
};

router.get("/", async (req, res) => {
  try {
    const { date, barber, service } = req.query;

    if (!date) {
      return res.status(400).json({
        message: "Date is required.",
      });
    }

    const duration = getServiceDuration(service);

    const startOfDay = new Date(`${date}T00:00:00`);
    const endOfDay = new Date(`${date}T23:59:59`);

    const existingBookings = await Booking.find({
      appointmentDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },

      status: {
        $ne: "cancelled",
      },

      ...(barber && barber !== "Any Barber"
        ? { barber }
        : {}),
    });

    const mongoBookedTimes = existingBookings.map((booking) =>
      booking.appointmentDate.toTimeString().slice(0, 5)
    );

    const checkedSlots = timeSlots.map((slot) => {
      const slotStart = new Date(`${date}T${slot}:00`);
      const slotEnd = new Date(
        slotStart.getTime() + duration * 60 * 1000
      );

      const overlappingBooking = existingBookings.find((booking) => {
        const bookingStart = new Date(booking.appointmentDate);

        const bookingEnd = new Date(
          bookingStart.getTime() + booking.duration * 60 * 1000
        );

        return (
          slotStart < bookingEnd &&
          slotEnd > bookingStart
        );
      });

      return {
        time: slot,
        available: !overlappingBooking,
        bookedInMongo: Boolean(overlappingBooking),
      };
    });

    const availableTimes = checkedSlots
      .filter((slot) => slot.available)
      .map((slot) => slot.time);

    const bookedTimes = checkedSlots
      .filter((slot) => !slot.available)
      .map((slot) => slot.time);

    res.json({
      date,
      barber: barber || "Any Barber",
      service: service || null,
      duration,
      availableTimes,
      bookedTimes,
      slots: checkedSlots,
    });
  } catch (error) {
    console.error("Availability error:", error);

    res.status(500).json({
      message: "Unable to check availability.",
    });
  }
});

export default router;