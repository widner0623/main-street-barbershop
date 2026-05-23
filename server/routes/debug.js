import express from "express";
import squareClient from "../utils/squareClient.js";
import { squareServiceMap } from "../config/squareMappings.js"

const router = express.Router();

router.get("/catalog", async (req, res) => {
    try {
       const objectIds = Object.values(squareServiceMap).map(
        (service) => service.variationId
       );

       const catalogResult = await squareClient.catalog.batchGet({
        objectIds,
        includeRelatedObjects: true,
       });

       const services = 
        catalogResult.objects?.flatMap((obj) => {
            const variations = obj.itemData?.variations || [];

            return variations.map((variation) => ({
                serviceName: obj.itemData?.name,
                itemId: obj.id,
                variationName: variation.itemVariationData?.name,
                variationId: variation.id,
                variationVersion: variation.version?.toString(),
                type: variation.type,
            }));
        }) || [];

        res.json(services);
    } catch (err) {
        console.error("Catalog debug error:", err);
        res.status(500).json({
            message: "Failed to fetch catalog objects.",
            error: err.message,
            body: err.body || null,
        });
    }
});

export default router;