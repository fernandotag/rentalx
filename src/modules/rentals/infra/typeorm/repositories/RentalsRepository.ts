import { type Repository } from "typeorm";

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
    const openByCar = await this.repository.findOneBy({ car_id });
    return openByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | null> {
    const openByUser = await this.repository.findOneBy({ user_id });
    return openByUser;
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental | null> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    await this.repository.save(rental);

    return rental;
  }
}

export { RentalsRepository };
