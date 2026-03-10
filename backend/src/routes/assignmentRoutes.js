import { Router } from "express";
import { assign, activate, listActive } from "../controllers/assignmentController.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();
router.get("/active", authRequired, listActive);
router.post("/", authRequired, assign);
router.post("/:id/activate", authRequired, activate);
export default router;