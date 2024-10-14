import express from "express";
import { paymentController } from "../controllers/payment";

const router = express.Router();

router.post("/payment", paymentController.createPayment);
router.get("/payment", paymentController.getPayments);
router.get("/payment/:id", paymentController.getPaymentById);
router.put("/payment/:id", paymentController.updatePayment);
router.delete("/payment/:id", paymentController.deletePayment);

export default router;
