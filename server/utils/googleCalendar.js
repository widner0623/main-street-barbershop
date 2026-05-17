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

export default calendar;