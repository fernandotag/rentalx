import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const authenticateToken = await authenticateUserUseCase.execute({
      password,
      email,
    });

    return response.json(authenticateToken);
  }
}

export { AuthenticateUserController };
