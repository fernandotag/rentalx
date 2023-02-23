import { type Repository } from "typeorm";

import { dataSource } from "@database/index";

import { Category } from "../../entities/Category";
import {
  type ICreateCategoryDTO,
  type ICategoriesRepository,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private readonly repository: Repository<Category>;

  constructor() {
    this.repository = dataSource.getRepository(Category);
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({ description, name });
    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.repository.findOne({ where: { name } });
    return category;
  }
}

export { CategoriesRepository };
