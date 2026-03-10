import { listCollectors } from "../models/collectorModel.js";
export async function listAllCollectors(req, res) {
  const rows = await listCollectors();
  res.json(rows);
}