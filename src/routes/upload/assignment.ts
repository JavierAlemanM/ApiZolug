import express from "express";
import multer from "multer";
import { assignmentController } from "../../controllers/upload/assignment";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
	"/upload/assignment",
	upload.single("file"),
	assignmentController.uploadAssignments,
);

export default router;
