import mongoose from "mongoose";

const displaySettingsSchema = new mongoose.Schema(
  {
    shopStatus: {
      type: String,
      enum: ["open", "busy", "closed"],
      default: "open",
    },
    waitTime: {
      type: Number,
      default: 15,
    },
    announcement: {
      type: String,
      default: "Walk-ins welcome today!",
    },
    giftCertificateText: {
      type: String,
      default: "Gift certificates available!",
    },
    slideDuration: {
      type: Number,
      default: 8000,
    },
    galleryImages: {
      type: [String],
      default: [
        "/display-gallery/cut1.jpg",
        "/display-gallery/cut2.jpg",
        "/display-gallery/cut3.jpg",
        "/display-gallery/cut4.jpg",
        "/display-gallery/cut5.jpg",
        "/display-gallery/cut6.jpg",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("DisplaySettings", displaySettingsSchema);