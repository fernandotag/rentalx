import { type RequestHandler, Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarUseCase = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle as RequestHandler);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated as RequestHandler,
  uploadAvatar.single("avatar"),
  updateUserAvatarUseCase.handle as RequestHandler
);

export { usersRoutes };
