import express from "express";
import { authController } from "../controllers/auth";

const router = express.Router();

router.post("/auth", authController.login);

export default router;
