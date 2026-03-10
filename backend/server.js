// server.js
import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";

import CONFIG from "./src/config.js";
import { testDb } from "./db.js";

// Routers
import authRoutes from "./src/routes/authRoutes.js";
import collectorRoutes from "./src/routes/collectorRoutes.js";
import routeRoutes from "./src/routes/routeRoutes.js";
import assignmentRoutes from "./src/routes/assignmentRoutes.js";
import gpsRoutes from "./src/routes/gpsRoutes.js";
import telemetryRoutes from "./src/routes/telemetryRoutes.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: CONFIG.CLIENT_ORIGIN, credentials: true }));

// API
app.use("/api/auth", authRoutes);
app.use("/api/collectors", collectorRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/gps", gpsRoutes);
app.use("/api/telemetry", telemetryRoutes);

// Health
app.get("/api/health", (req, res) => res.json({ ok: true, now: new Date().toISOString() }));

// Start HTTP server
const server = app.listen(CONFIG.PORT, async () => {
  console.log(`🚀 API listening on http://localhost:${CONFIG.PORT}`);
  await testDb();
});

// WebSocket for live updates
const wss = new WebSocketServer({ server, path: CONFIG.WS_PATH });
wss.on("connection", (ws) => {
  console.log("🔌 WS client connected");
  ws.on("close", () => console.log("🔌 WS client disconnected"));
});
app.set("wss", wss);