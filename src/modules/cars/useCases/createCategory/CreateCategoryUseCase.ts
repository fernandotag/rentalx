import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { type ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private readonly categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists != null) {
      throw new AppError("Category already exists.");
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
