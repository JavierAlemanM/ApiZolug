import express from "express";
import { baseController } from "../controllers/bases";

const router = express.Router();

router.post("/bases", baseController.createBase);
router.get("/bases", baseController.getAllBases);
router.get("/bases/:id", baseController.getBaseById);
router.put("/bases/:id", baseController.updateBase);
router.delete("/bases/:id", baseController.deleteBase);

export default router;
