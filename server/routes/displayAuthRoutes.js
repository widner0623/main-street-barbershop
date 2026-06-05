import express from "express";

const router = express.Router();

router.post("/login", (req, res) => {
    const { pin } = req.body;

    if (pin === process.env.DISPLAY_ADMIN_PIN) {
        return res.json({
            success: true,
        });
    }

    return res.status(401).json({
        success: false,
        message: "Invalid PIN",
    });
});

export default router;