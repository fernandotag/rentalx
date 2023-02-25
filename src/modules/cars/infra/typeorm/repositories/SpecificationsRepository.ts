import { type Repository } from "typeorm";
import { In } from "typeorm";

import {
  type ICreateSpecificationDTO,
  type ISpecificationsRepository,
} from "@modules/cars/repositories/ISpecificationsRepository";
import { dataSource } from "@shared/infra/typeorm/index";

import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private readonly repository: Repository<Specification>;

  constructor() {
    this.repository = dataSource.getRepository(Specification);
  }

  async create({
    description,
    name,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification | null> {
    const specification = await this.repository.findOneBy({ name });
    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findBy({ id: In(ids) });
    return specifications;
  }
}

export { SpecificationsRepository };
