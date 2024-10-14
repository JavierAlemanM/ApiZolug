import express from "express";
import { decilController } from "../controllers/decils";

const router = express.Router();

router.post("/decils", decilController.createDecil);
router.get("/decils", decilController.getAllDecils);
router.get("/decils/:id", decilController.getDecilById);
router.put("/decils/:id", decilController.updateDecil);
router.delete("/decils/:id", decilController.deleteDecil);

export default router;
