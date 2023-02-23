import { type RequestHandler, Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.use(ensureAuthenticated as RequestHandler);
specificationsRoutes.post(
  "/",
  createSpecificationController.handle as RequestHandler
);

specificationsRoutes.get(
  "/",
  listSpecificationsController.handle as RequestHandler
);

export { specificationsRoutes };
