import express from "express";
import { epsController } from "../controllers/eps";

const router = express.Router();

router.post("/eps", epsController.createEps);
router.get("/eps", epsController.getAllEps);
router.get("/eps/:id", epsController.getEpsById);
router.put("/eps/:id", epsController.updateEps);
router.delete("/eps/:id", epsController.deleteEps);

export default router;
