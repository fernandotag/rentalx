import { type Request, type Response } from "express";

import { type ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  constructor(private readonly importCategoryUseCase: ImportCategoryUseCase) {}

  handle(request: Request, response: Response): Response {
    const { file } = request;

    file != null && this.importCategoryUseCase.execute(file);

    return response.send();
  }
}

export { ImportCategoryController };
