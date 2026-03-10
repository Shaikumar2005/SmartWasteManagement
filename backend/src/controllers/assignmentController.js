import { assignRoute, listActiveAssignments, setAssignmentStatus } from "../models/assignmentModel.js";

export async function assign(req, res) {
  const { collector_id, route_id } = req.body;
  if (!collector_id || !route_id) return res.status(400).json({ message: "collector_id, route_id required" });
  const id = await assignRoute(collector_id, route_id);
  res.json({ id, message: "Assigned" });
}

export async function activate(req, res) {
  const { id } = req.params;
  await setAssignmentStatus(id, "live");
  res.json({ message: "Assignment LIVE" });
}

export async function listActive(req, res) {
  const rows = await listActiveAssignments();
  res.json(rows);
}