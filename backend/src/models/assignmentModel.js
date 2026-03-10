import { pool } from "../../db.js";

export async function assignRoute(collector_id, route_id) {
  const [r] = await pool.query(
    "INSERT INTO assignments (collector_id, route_id, status) VALUES (?, ?, 'assigned')",
    [collector_id, route_id]
  );
  return r.insertId;
}

export async function setAssignmentStatus(id, status) {
  await pool.query("UPDATE assignments SET status=? WHERE id=?", [status, id]);
}

export async function listActiveAssignments() {
  const [rows] = await pool.query(
    `SELECT a.id, a.status, a.assigned_at,
            c.id AS collector_id, c.name AS collector_name,
            r.id AS route_id, r.name AS route_name
     FROM assignments a
     JOIN collectors c ON c.id = a.collector_id
     JOIN routes r ON r.id = a.route_id
     WHERE a.status IN ('assigned','live')
     ORDER BY a.assigned_at DESC`
  );
  return rows;
}
