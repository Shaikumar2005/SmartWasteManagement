import { pool } from "../../db.js";

export async function addTelemetry({ collector_id, battery=null, signal=null, temp=null }) {
  const [r] = await pool.query(
    "INSERT INTO telemetry (collector_id, battery, signal, temp) VALUES (?,?,?,?)",
    [collector_id, battery, signal, temp]
  );
  return r.insertId;
}

export async function latestTelemetry(collector_id) {
  const [rows] = await pool.query(
    "SELECT * FROM telemetry WHERE collector_id=? ORDER BY created_at DESC, id DESC LIMIT 1",
    [collector_id]
  );
  return rows[0] || null;
}