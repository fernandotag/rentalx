import { v4 as uuid } from "uuid";

import { Category } from "../model/Category";
import {
  type ICreateCategoryDTO,
  type ICategoriesRepository,
} from "./ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private readonly categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ description, name }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      id: uuid(),
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}

export { CategoriesRepository };
