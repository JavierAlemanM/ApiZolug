import express from "express";
import multer from "multer";
import { baseController } from "../../controllers/upload/bases";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload/bases", upload.single("file"), baseController.uploadBases);

export default router;
