import { Router } from "express";
import { latest, postTelemetry } from "../controllers/telemetryController.js";
const router = Router();

router.post("/", postTelemetry);
router.get("/latest/:collector_id", latest);

export default router;