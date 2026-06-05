import express from "express";
import multer from "multer";
import path from "path";
import DisplaySettings from "../models/DisplaySettings.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/display");
    },
    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() + path.extname(file.originalname);

        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
    try {
        let settings = await DisplaySettings.findOne();

        if (!settings) {
            settings = await DisplaySettings.create({});
        }

        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: "Failed to load display settings" });
    }
});

router.put("/", async (req, res) => {
    try {
        let settings = await DisplaySettings.findOne();

        if (!settings) {
            settings = await DisplaySettings.create(req.body);
        } else {
            Object.assign(settings, req.body);
            await settings.save();
        }

        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: "Failed to update display settings" });
    }
});

router.post(
    "/upload-image",
    upload.single("image"),
    async (req, res) => {
        try {
            const { index } = req.body;

            let settings = await DisplaySettings.findOne();

            if (!settings) {
                settings = await DisplaySettings.create({});
            }

            const imageUrl = `/uploads/display/${req.file.filename}`;

            const updatedImages = settings.galleryImages || [];

            updatedImages[Number(index)] = imageUrl;

            settings.galleryImages = updatedImages;

            await settings.save();

            res.json({
                success: true,
                imageUrl,
                galleryImages: settings.galleryImages,
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
                success: false,
                message: "Failed to upload image",
            });
        }
    }
);

export default router;