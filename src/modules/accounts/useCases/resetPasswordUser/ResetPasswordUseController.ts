import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

class ResetPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;

    const resetPasswordUserUseCase = container.resolve(
      ResetPasswordUserUseCase
    );

    if (typeof token !== "string") throw new AppError("Token invalid!");

    await resetPasswordUserUseCase.execute({ token, password });

    return response.send();
  }
}

export { ResetPasswordUserController };
