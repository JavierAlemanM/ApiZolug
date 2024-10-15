import express from "express";
import multer from "multer";
import { epsUploadController } from "../../controllers/upload/eps";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
   "/upload/eps",
   upload.single("file"),
   epsUploadController.uploadEps,
);

export default router;

