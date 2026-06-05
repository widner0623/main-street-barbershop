import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookingRoutes from "./routes/bookings.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
import squareSetupRoutes from "./routes/squareSetupRoutes.js";
import debugRoutes from "./routes/debug.js";
import displayRoutes from "./routes/displayRoutes.js";
import displayAuthRoutes from "./routes/displayAuthRoutes.js";
import path from "path";

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/square/setup", squareSetupRoutes);
app.use("/api/debug", debugRoutes);
// display routes for electronic sign
app.use("/api/display", displayRoutes);
app.use("/api/display-auth", displayAuthRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Main Street Barbershop API is running");
});

// MongoDB connection + server start
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));