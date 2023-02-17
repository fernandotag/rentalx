import { type Request, type Response } from "express";

import { type ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationsController {
  constructor(
    private readonly listSpecificationsUseCase: ListSpecificationsUseCase
  ) {}

  handle(request: Request, response: Response): Response {
    const allSpecifications = this.listSpecificationsUseCase.execute();
    return response.json(allSpecifications);
  }
}

export { ListSpecificationsController };
