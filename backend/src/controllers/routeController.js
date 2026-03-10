import { addRoutePoints, createRoute, getRouteWithPoints, listRoutes } from "../models/routeModel.js";

export async function listAllRoutes(req, res) {
  const rows = await listRoutes();
  res.json(rows);
}

export async function createNewRoute(req, res) {
  const { name, points } = req.body;
  if (!name || !Array.isArray(points) || points.length === 0)
    return res.status(400).json({ message: "name + points required" });

  const routeId = await createRoute(name);
  await addRoutePoints(routeId, points);
  const data = await getRouteWithPoints(routeId);
  res.json(data);
}

export async function getRoute(req, res) {
  const { id } = req.params;
  const data = await getRouteWithPoints(id);
  res.json(data);
}