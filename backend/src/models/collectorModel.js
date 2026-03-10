import { pool } from "../../db.js";

export async function listCollectors() {
  const [rows] = await pool.query("SELECT * FROM collectors ORDER BY id DESC");
  return rows;
}