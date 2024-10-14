import express from "express";
import multer from "multer";
import { employmentController } from "../../controllers/upload/employment";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
   "/upload/employment",
   upload.single("file"),
   employmentController.uploadEmployments
);

export default router;
