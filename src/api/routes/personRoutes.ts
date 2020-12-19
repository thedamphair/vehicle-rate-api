import { Router } from "express";

import { AddPersonController } from "../controllers";

const vehicleRoutes = Router();
const addPersonController = new AddPersonController();

vehicleRoutes.post("/", (req, res) =>
  addPersonController.execute(req, res)
);

export { vehicleRoutes };