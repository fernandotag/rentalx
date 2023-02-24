import { type Response, type Request } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, brand, category_id } = request.query as IRequest;

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const cars = await listAvailableCarsUseCase.execute({
      brand,
      category_id,
      name,
    });

    return response.json(cars);
  }
}

export { ListAvailableCarsController };
