import { type Response, type Request } from "express";

import { type ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  constructor(private readonly listCategoriesUseCase: ListCategoriesUseCase) {}

  handle(request: Request, response: Response): Response {
    const allCategories = this.listCategoriesUseCase.execute();
    return response.json(allCategories);
  }
}

export { ListCategoriesController };
