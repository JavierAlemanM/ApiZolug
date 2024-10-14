import express from "express";
import { walletController } from "../controllers/wallet";

const router = express.Router();

router.post("/wallets", walletController.createWallet);
router.get("/wallets", walletController.getAllWallets);
router.get("/wallets/:id", walletController.getWalletById);
router.put("/wallets/:id", walletController.updateWallet);
router.delete("/wallets/:id", walletController.deleteWallet);

export default router;
