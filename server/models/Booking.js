import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    service: {
      type: String,
      required: true,
      trim: true,
    },

    barber: {
      type: String,
      default: "Any Barber",
    },

    appointmentDate: {
      type: Date,
      required: true,
    },

    duration: {
      type: Number,
      default: 60,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },

    googleEventId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index(
  { appointmentDate: 1, barber: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: { $ne: "cancelled" },
    },
  }
);

export default mongoose.model("Booking", bookingSchema);