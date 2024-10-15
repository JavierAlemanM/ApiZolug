import express from "express";
import { phoneController } from "../controllers/phones";

const router = express.Router();

router.post("/phones", phoneController.createPhone);
router.get("/phones", phoneController.getAllPhones);
router.get("/phones/:id", phoneController.getPhoneById);
router.put("/phones/:id", phoneController.updatePhone);
router.delete("/phones/:id", phoneController.deletePhone);

export default router;
