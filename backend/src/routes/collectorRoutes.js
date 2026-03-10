import { Router } from "express";
import { listAllCollectors } from "../controllers/collectorController.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();
router.get("/", authRequired, listAllCollectors);
export default router;