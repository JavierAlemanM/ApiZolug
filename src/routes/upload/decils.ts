import express from "express";
import multer from "multer";
import { decilController } from "../../controllers/upload/decils";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
	"/upload/decils",
	upload.single("file"),
	decilController.uploadDecils,
);

export default router;
