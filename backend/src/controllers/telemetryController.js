import { addTelemetry, latestTelemetry } from "../models/telemetryModel.js";

export async function postTelemetry(req, res) {
  const { collector_id, battery=null, signal=null, temp=null } = req.body;
  if (!collector_id) return res.status(400).json({ message: "collector_id required" });

  await addTelemetry({ collector_id, battery, signal, temp });

  const payload = { type: "telemetry_update", collector_id, battery, signal, temp, ts: Date.now() };
  req.app.get("wss")?.clients.forEach(client => {
    if (client.readyState === 1) client.send(JSON.stringify(payload));
  });

  res.json({ ok: true });
}

export async function latest(req, res) {
  const row = await latestTelemetry(req.params.collector_id);
  res.json(row || {});
}