import { type RequestHandler, Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/createRentalController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRouter = Router();

const createRentalController = new CreateRentalController();

rentalsRouter.post(
  "/",
  ensureAuthenticated as RequestHandler,
  createRentalController.handle as RequestHandler
);

export { rentalsRouter };
