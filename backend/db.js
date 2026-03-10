// db.js
import mysql from "mysql2/promise";
import CONFIG from "./src/config.js";

export const pool = mysql.createPool({
  host: CONFIG.DB_HOST,
  user: CONFIG.DB_USER,
  password: CONFIG.DB_PASS,
  database: CONFIG.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

export async function testDb() {
  const [rows] = await pool.query("SELECT DATABASE() AS db");
  console.log(`✅ MySQL connected → ${rows?.[0]?.db}`);
}
