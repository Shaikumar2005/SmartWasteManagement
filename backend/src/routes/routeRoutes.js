import { Router } from "express";
import { createNewRoute, getRoute, listAllRoutes } from "../controllers/routeController.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();
router.get("/", authRequired, listAllRoutes);
router.get("/:id", authRequired, getRoute);
router.post("/", authRequired, createNewRoute);
export default router;