import express from "express";
import multer from "multer";
import {  walletController } from "../../controllers/upload/wallet";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
	"/upload/wallet",
	upload.single("file"),
	walletController.uploadWallets,
);

export default router;
