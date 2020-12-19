import { Router } from "express";
import { apiRoot } from "../../config";
import { vehicleRoutes } from "./vehicleRoutes";

const router = Router();

router.get("/", (req, res) => {
  return res.json({ messge: "alive!" });
});

router.use(`${apiRoot}/vehicles`, vehicleRoutes);

export { router };
