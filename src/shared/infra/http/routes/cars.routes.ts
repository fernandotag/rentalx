import { type RequestHandler, Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post(
  "/",
  ensureAuthenticated as RequestHandler,
  ensureAdmin as RequestHandler,
  createCarController.handle as RequestHandler
);

carsRoutes.get(
  "/available",
  listAvailableCarsController.handle as RequestHandler
);

export { carsRoutes };
