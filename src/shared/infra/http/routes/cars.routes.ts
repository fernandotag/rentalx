import { type RequestHandler, Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig);

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

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated as RequestHandler,
  ensureAdmin as RequestHandler,
  createCarSpecificationController.handle as RequestHandler
);

carsRoutes.post(
  "/images/:id",
  ensureAuthenticated as RequestHandler,
  ensureAdmin as RequestHandler,
  upload.array("images"),
  uploadCarImagesController.handle as RequestHandler
);

export { carsRoutes };
