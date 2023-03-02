import { IsNull, type Repository } from "typeorm";

import { type ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { type IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { dataSource } from "@shared/infra/typeorm";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private readonly repository: Repository<Rental>;

  constructor() {
    this.repository = dataSource.getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental | null> {
    const openByCar = await this.repository.findOne({
      where: { car_id, end_date: IsNull() },
    });
    return openByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | null> {
    const openByUser = await this.repository.findOne({
      where: { user_id, end_date: IsNull() },
    });
    return openByUser;
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental | null> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      id,
      end_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental | null> {
    const rental = await this.repository.findOneBy({ id });
    return rental;
  }
}

export { RentalsRepository };
