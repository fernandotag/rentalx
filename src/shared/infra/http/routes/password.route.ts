import { type RequestHandler, Router } from "express";

import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUseController";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/sendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post(
  "/forgot",
  sendForgotPasswordMailController.handle as RequestHandler
);

passwordRoutes.post(
  "/reset",
  resetPasswordUserController.handle as RequestHandler
);

export { passwordRoutes };
