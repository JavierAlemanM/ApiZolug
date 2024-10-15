import express from "express";
import multer from "multer";
import { propertiesController } from "../../controllers/upload/properties";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
   "/upload/properties", 
   upload.single("file"), 
   propertiesController.uploadProperties
);

export default router;

