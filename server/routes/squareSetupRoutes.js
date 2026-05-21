import express from "express";
import squareClient from "../utils/squareClient.js";

const router = express.Router();

const cleanSquareData = (data) => {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
};

router.get("/locations", async (req, res) => {
  try {
    const response = await squareClient.locations.list();
    res.json(cleanSquareData(response.locations || []));
  } catch (error) {
    console.error("Square locations error:", error);
    res.status(500).json({
      message: "Unable to fetch Square locations.",
    });
  }
});

router.get("/team-members", async (req, res) => {
  try {
    const response = await squareClient.teamMembers.search({
      query: {
        filter: {
          status: "ACTIVE",
        },
      },
    });

    res.json(cleanSquareData(response.teamMembers || []));
  } catch (error) {
    console.error("Square team members error:", error);
    res.status(500).json({
      message: "Unable to fetch team members.",
    });
  }
});

router.get("/services", async (req, res) => {
  try {
    const response = await squareClient.catalog.search({
      objectTypes: ["ITEM"],
    });

    res.json(cleanSquareData(response.objects || []));
  } catch (error) {
    console.error("Square services error:", error);
    res.status(500).json({
      message: "Unable to fetch services.",
    });
  }
});

export default router;