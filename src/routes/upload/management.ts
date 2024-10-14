import express from "express";
import multer from "multer";
import { managementController } from "../../controllers/upload/management";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
	"/upload/management",
	upload.single("file"),
	managementController.uploadManagements,
);

export default router;
