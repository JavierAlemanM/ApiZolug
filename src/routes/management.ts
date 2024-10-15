import express from "express";
import { managementController } from "../controllers/management";

const router = express.Router();

router.post("/management", managementController.createManagement);
router.get("/management", managementController.getAllManagements);
router.get("/management/:id", managementController.getManagementById);
router.put("/management/:id", managementController.updateManagement);
router.delete("/management/:id", managementController.deleteManagement);

export default router;

