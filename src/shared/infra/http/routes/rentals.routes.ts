import { type RequestHandler, Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/createRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRouter = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalsRouter.post(
  "/",
  ensureAuthenticated as RequestHandler,
  createRentalController.handle as RequestHandler
);
rentalsRouter.post(
  "/devolution/:id",
  ensureAuthenticated as RequestHandler,
  devolutionRentalController.handle as RequestHandler
);

export { rentalsRouter };
