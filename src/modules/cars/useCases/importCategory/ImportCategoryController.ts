import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
    if (file != null) {
      await importCategoryUseCase.execute(file);
    }

    return response.send();
  }
}

export { ImportCategoryController };
