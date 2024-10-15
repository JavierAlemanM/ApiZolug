import express from "express";
import multer from "multer";
import { campaignController } from "../../controllers/upload/campaign";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
	"/upload/campaigns",
	upload.single("file"),
	campaignController.uploadCampaigns,
);

export default router;
