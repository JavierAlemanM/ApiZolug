import express from "express";
import multer from "multer";
import { phoneController } from "../../controllers/upload/phones";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
	"/upload/phones",
	upload.single("file"),
	phoneController.uploadPhones,
);

export default router;
