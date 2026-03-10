import { pool } from "../../db.js";

export async function listRoutes() {
  const [rows] = await pool.query(
    `SELECT r.*, COUNT(rp.id) AS points
     FROM routes r
     LEFT JOIN route_points rp ON rp.route_id = r.id
     GROUP BY r.id
     ORDER BY r.id DESC`
  );
  return rows;
}

export async function createRoute(name) {
  const [r] = await pool.query("INSERT INTO routes (name) VALUES (?)", [name]);
  return r.insertId;
}

export async function addRoutePoints(route_id, points) {
  // points = [{lat,lng}]
  if (!Array.isArray(points) || points.length === 0) return;
  const values = points.map((p, i) => [route_id, i + 1, p.lat, p.lng]);
  await pool.query(
    "INSERT INTO route_points (route_id, seq, lat, lng) VALUES ?",
    [values]
  );
}

export async function getRouteWithPoints(route_id) {
  const [[route]] = await pool.query("SELECT * FROM routes WHERE id=?", [route_id]);
  const [points] = await pool.query(
    "SELECT id, seq, lat, lng FROM route_points WHERE route_id=? ORDER BY seq ASC",
    [route_id]
  );
  return { route, points };
}