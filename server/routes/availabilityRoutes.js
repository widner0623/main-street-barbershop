import express from "express";
import Booking from "../models/Booking.js";
import { squareServiceMap, squareBarberMap } from "../config/squareMappings.js";
import squareClient from "../utils/squareClient.js";

const router = express.Router();

const formatTime = (date) => {
  return date.toLocaleTimeString("en-US", {
    timeZone: "America/Chicago",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

router.get("/", async (req, res) => {
  try {
    const { date, barber, service } = req.query;

    console.log("date from frontend:", date);
    console.log(
      "parsed server date:",
      new Date(`${date}T12:00:00`).toString()
    );
    console.log(
      "day of the week:",
      new Date(`${date}T12:00:00`).getDay()
    );

    if (!date) {
      return res.status(400).json({ message: "Date is required." });
    }

    if (!service || !squareServiceMap[service]) {
      return res.status(400).json({ message: "Valid service is required." });
    }

    const serviceInfo = squareServiceMap[service];

    if (!serviceInfo.variationId) {
      return res.status(400).json({
        message: "This service is missing a Square variation ID.",
      });
    }

    const startOfDay = new Date(`${date}T00:00:00`);
    const endOfDay = new Date(`${date}T23:59:59`);
    const now = new Date();

    const locationsResult = await squareClient.locations.list();
    const locationId = locationsResult.locations?.[0]?.id;

    if (!locationId) {
      return res.status(500).json({
        message: "Square location was not found.",
      });
    }

    const teamMemberIds =
      barber && barber !== "Any Barber"
        ? squareBarberMap[barber]
          ? [squareBarberMap[barber]]
          : []
        : Object.values(squareBarberMap);

    if (teamMemberIds.length === 0) {
      return res.json({
        date,
        barber: barber || "Any Barber",
        service,
        duration: serviceInfo.duration,
        availableTimes: [],
        bookedTimes: [],
        slots: [],
      });
    }

    const squareAvailability = await squareClient.bookings.searchAvailability({
      query: {
        filter: {
          startAtRange: {
            startAt: `${date}T00:00:00-05:00`,
            endAt: `${date}T23:59:59-05:00`,
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

    let squareSlots = squareAvailability.availabilities || [];

    squareSlots = squareSlots.filter((slot) => {
      const slotStart = new Date(slot.startAt);
      return slotStart > now;
    });

    const existingBookings = await Booking.find({
      appointmentDate: { $gte: startOfDay, $lte: endOfDay },
      status: { $ne: "cancelled" },
      ...(barber && barber !== "Any Barber" ? { barber } : {}),
    });

    const checkedSlots = squareSlots.map((slot) => {
      const slotStart = new Date(slot.startAt);
      const time = formatTime(slotStart);

      const overlappingBooking = existingBookings.find((booking) => {
        const bookingStart = new Date(booking.appointmentDate);
        const bookingEnd = new Date(
          bookingStart.getTime() + booking.duration * 60 * 1000
        );

        const slotEnd = new Date(
          slotStart.getTime() + serviceInfo.duration * 60 * 1000
        );

        return slotStart < bookingEnd && slotEnd > bookingStart;
      });

      return {
        time,
        available: !overlappingBooking,
        bookedInMongo: Boolean(overlappingBooking),
        squareStartAt: slot.startAt,
        teamMemberId: slot.appointmentSegments?.[0]?.teamMemberId || null,
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
      service,
      duration: serviceInfo.duration,
      availableTimes,
      bookedTimes,
      slots: checkedSlots,
    });
  } catch (error) {
    console.error("Square availability error:", error);

    res.status(500).json({
      message: "Unable to check Square availability.",
    });
  }
});

export default router;