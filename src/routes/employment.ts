import express from "express";
import { employmentController } from "../controllers/employment";

const router = express.Router();

router.post("/employment", employmentController.createEmployment);
router.get("/employment", employmentController.getAllEmployments);
router.get("/employment/:id", employmentController.getEmploymentById);
router.put("/employment/:id", employmentController.updateEmployment);
router.delete("/employment/:id", employmentController.deleteEmployment);

export default router;
