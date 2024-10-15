import express from "express";
import { generalController } from "../controllers/generals";

const router = express.Router();

router.post("/generals", generalController.createGeneral);
router.get("/generals", generalController.getAllGenerals);
router.get("/generals/:id", generalController.getGeneralById);
router.put("/generals/:id", generalController.updateGeneral);
router.delete("/generals/:id", generalController.deleteGeneral);

export default router;
