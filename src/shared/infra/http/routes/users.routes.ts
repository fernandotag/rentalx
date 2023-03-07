import { type RequestHandler, Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ProfileUserController } from "@modules/cars/useCases/profileUser/ProfileUserController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarUseCase = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.handle as RequestHandler);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated as RequestHandler,
  uploadAvatar.single("avatar"),
  updateUserAvatarUseCase.handle as RequestHandler
);

usersRoutes.get(
  "/profile",
  ensureAuthenticated as RequestHandler,
  profileUserController.handle as RequestHandler
);

export { usersRoutes };
