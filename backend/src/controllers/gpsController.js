import { addGpsLog, getLatestGps, getTrail } from "../models/gpsModel.js";

export async function postGps(req, res) {
  try {
    const { collector_id, lat, lng, speed=0, battery=null } = req.body;
    if (!collector_id || lat==null || lng==null)
      return res.status(400).json({ message: "collector_id, lat, lng required" });

    await addGpsLog({ collector_id, lat, lng, speed, battery });

    // WS broadcast
    const payload = { type: "gps_update", collector_id, lat, lng, speed, battery, ts: Date.now() };
    req.app.get("wss")?.clients.forEach(client => {
      if (client.readyState === 1) client.send(JSON.stringify(payload));
    });

    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
}

export async function latest(req, res) {
  const row = await getLatestGps(req.params.collector_id);
  res.json(row || {});
}

export async function trail(req, res) {
  const minutes = Number(req.query.minutes || 120);
  const rows = await getTrail(req.params.collector_id, minutes);
  res.json(rows);
}