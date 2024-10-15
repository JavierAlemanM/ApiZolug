import express from "express";
import multer from "multer";
import { balanceController } from "../../controllers/upload/balances";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
	"/upload/balances",
	upload.single("file"),
	balanceController.uploadBalances,
);

export default router;
