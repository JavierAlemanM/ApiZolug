import express from "express";
import { assignmentController } from "../controllers/assignment";

const router = express.Router();

router.post("/assignments", assignmentController.createAssignment);
router.get("/assignments", assignmentController.getAllAssignments);
router.get("/assignments/:id", assignmentController.getAssignmentById);
router.put("/assignments/:id", assignmentController.updateAssignment);
router.delete("/assignments/:id", assignmentController.deleteAssignment);

export default router;


