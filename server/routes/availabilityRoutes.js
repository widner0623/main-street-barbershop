import express from "express";
import Booking from "../models/Booking.js";
import { checkCalendarAvailability } from "../utils/googleCalendar.js";

const router = express.Router();

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

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
      ...(barber && barber !== "Any Barber" ? { barber } : {}),
    });

    const mongoBookedTimes = existingBookings.map((booking) => {
      return booking.appointmentDate.toTimeString().slice(0, 5);
    });

    const checkedSlots = await Promise.all(
      timeSlots.map(async (slot) => {
        const slotStart = new Date(`${date}T${slot}:00`);
        const slotEnd = new Date(slotStart.getTime() + duration * 60 * 1000);

        const isBookedInMongo = mongoBookedTimes.includes(slot);

        const calendarAvailability = await checkCalendarAvailability({
          startTime: slotStart.toISOString(),
          endTime: slotEnd.toISOString(),
        });

        const isBookedInGoogle = !calendarAvailability.isAvailable;

        return {
          time: slot,
          available: !isBookedInMongo && !isBookedInGoogle,
          bookedInMongo: isBookedInMongo,
          bookedInGoogle: isBookedInGoogle,
        };
      })
    );

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