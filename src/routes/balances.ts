import express from "express";
import { balanceController } from "../controllers/balances";

const router = express.Router();

router.post("/balances", balanceController.createBalance);
router.get("/balances", balanceController.getAllBalances);
router.get("/balances/:id", balanceController.getBalanceById);
router.put("/balances/:id", balanceController.updateBalance);
router.delete("/balances/:id", balanceController.deleteBalance);

export default router;
