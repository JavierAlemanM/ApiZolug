import express from "express";
import { propertiesController } from "../controllers/properties";

const router = express.Router();

router.post("/properties", propertiesController.createProperty);
router.get("/properties", propertiesController.getAllProperties);
router.get("/properties/:id", propertiesController.getPropertyById);
router.put("/properties/:id", propertiesController.updateProperty);
router.delete("/properties/:id", propertiesController.deleteProperty);

export default router;
