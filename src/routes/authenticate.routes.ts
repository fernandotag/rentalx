import { type RequestHandler, Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();
const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post(
  "/sessions",
  authenticateUserController.handle as RequestHandler
);

export { authenticateRoutes };
