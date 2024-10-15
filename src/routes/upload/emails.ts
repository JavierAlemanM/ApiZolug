import express from "express";
import multer from "multer";
import { emailController } from "../../controllers/upload/emails";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
	"/upload/emails",
	upload.single("file"),
	emailController.uploadEmails,
);

export default router;
