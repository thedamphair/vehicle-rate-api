import { Router } from "express";

import { ListVehiclesController } from "../controllers";

const vehicleRoutes = Router();
const listVehiclesController = new ListVehiclesController();

vehicleRoutes.get("/", (req, res) =>
  listVehiclesController.execute(req, res)
);

export { vehicleRoutes };
