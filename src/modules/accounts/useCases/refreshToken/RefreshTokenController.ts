import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token = this.getToken(request);

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const refresh_token = await refreshTokenUseCase.execute(token);

    return response.json(refresh_token);
  }

  private getToken(request: Request): string {
    if (request.body.token !== undefined) {
      return request.body.token;
    } else if (request.headers["x-access-token"] !== undefined) {
      return request.headers["x-access-token"] as string;
    } else {
      return request.query.token as string;
    }
  }
}

export { RefreshTokenController };
