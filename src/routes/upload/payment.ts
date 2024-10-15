import express from "express";
import multer from "multer";
import { paymentController } from "../../controllers/upload/payment";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
	"/upload/payment",
	upload.single("file"),
	paymentController.uploadPayments,
);

export default router;
   