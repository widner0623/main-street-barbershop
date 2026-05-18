import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

const auth = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  SCOPES
);

const calendar = google.calendar({
  version: "v3",
  auth,
});

export const checkCalendarAvailability = async ({ startTime, endTime }) => {
  if (
    !process.env.GOOGLE_CLIENT_EMAIL ||
    !process.env.GOOGLE_PRIVATE_KEY ||
    !process.env.GOOGLE_CALENDAR_ID
  ) {
    return {
      configured: false,
      isAvailable: true,
      busy: [],
    };
  }

  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: startTime,
      timeMax: endTime,
      items: [{ id: process.env.GOOGLE_CALENDAR_ID }],
    },
  });

  const busy =
    response.data.calendars?.[process.env.GOOGLE_CALENDAR_ID]?.busy || [];

  return {
    configured: true,
    isAvailable: busy.length === 0,
    busy,
  };
};

export const createCalendarEvent = async ({
  customerName,
  email,
  phone,
  service,
  barber,
  notes,
  startTime,
  endTime,
}) => {
  if (
    !process.env.GOOGLE_CLIENT_EMAIL ||
    !process.env.GOOGLE_PRIVATE_KEY ||
    !process.env.GOOGLE_CALENDAR_ID
  ) {
    return null;
  }

  const response = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    sendUpdates: "none",
    requestBody: {
      summary: `${service} - ${customerName}`,
      description: `
Customer: ${customerName}
Email: ${email}
Phone: ${phone}
Service: ${service}
Barber: ${barber || "Any Barber"}
Notes: ${notes || "None"}
      `,
      start: {
        dateTime: startTime,
        timeZone: "America/Chicago",
      },
      end: {
        dateTime: endTime,
        timeZone: "America/Chicago",
      },
    },
  });

  return response.data;
};