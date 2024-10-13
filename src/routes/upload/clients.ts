import express from "express";
import multer from "multer";
import { clientController } from "../../controllers/upload/clients";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
	"/upload/clients",
	upload.single("file"),
	clientController.uploadClients,
);

export default router;
