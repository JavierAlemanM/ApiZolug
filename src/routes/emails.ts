import express from "express";
import { emailController } from "../controllers/emails";

const router = express.Router();

router.post("/emails", emailController.createEmail);
router.get("/emails", emailController.getAllEmails);
router.get("/emails/:id", emailController.getEmailById);
router.put("/emails/:id", emailController.updateEmail);
router.delete("/emails/:id", emailController.deleteEmail);

export default router;
