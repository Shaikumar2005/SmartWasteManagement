import { Router } from "express";
import { latest, postGps, trail } from "../controllers/gpsController.js";

const router = Router();
// Device posting GPS (leave open or add a device key header check here)
router.post("/", postGps);
router.get("/latest/:collector_id", latest);
router.get("/trail/:collector_id", trail);

export default router;