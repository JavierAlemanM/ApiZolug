import express from "express";
import { campaignController } from "../controllers/campaign";

const router = express.Router();

router.post("/campaigns", campaignController.createCampaign);
router.get("/campaigns", campaignController.getAllCampaigns);
router.get("/campaigns/:id", campaignController.getCampaignById);
router.put("/campaigns/:id", campaignController.updateCampaign);
router.delete("/campaigns/:id", campaignController.deleteCampaign);

export default router;
