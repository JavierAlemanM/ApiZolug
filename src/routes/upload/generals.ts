import express from "express";
import multer from "multer";
import { generalController } from "../../controllers/upload/generals";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
	"/upload/generals",
	upload.single("file"),
	generalController.uploadGenerals,
);

export default router;
