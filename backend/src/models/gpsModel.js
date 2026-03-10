import { pool } from "../../db.js";

export async function addGpsLog({ collector_id, lat, lng, speed=0, battery=null }) {
  const [r] = await pool.query(
    "INSERT INTO gps_logs (collector_id, lat, lng, speed, battery) VALUES (?,?,?,?,?)",
    [collector_id, lat, lng, speed, battery]
  );
  return r.insertId;
}

export async function getLatestGps(collector_id) {
  const [rows] = await pool.query(
    "SELECT * FROM gps_logs WHERE collector_id=? ORDER BY recorded_at DESC, id DESC LIMIT 1",
    [collector_id]
  );
  return rows[0] || null;
}

export async function getTrail(collector_id, minutes = 120) {
  const [rows] = await pool.query(
    `SELECT * FROM gps_logs
     WHERE collector_id=? AND recorded_at >= NOW() - INTERVAL ? MINUTE
     ORDER BY recorded_at ASC`,
    [collector_id, minutes]
  );
  return rows;
}