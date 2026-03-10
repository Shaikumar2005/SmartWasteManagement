import { pool } from "../../db.js";

export async function getUserByEmail(email) {
  const [rows] = await pool.query("SELECT * FROM users WHERE email=?", [email]);
  return rows[0] || null;
}

export async function createUser({ name, email, password_hash, role='admin' }) {
  const [r] = await pool.query(
    "INSERT INTO users (name,email,password_hash,role) VALUES (?,?,?,?)",
    [name, email, password_hash, role]
  );
  return r.insertId;
}