import { type Repository } from "typeorm";

import { type ICreateCarDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { type ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { dataSource } from "@shared/infra/typeorm";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private readonly repository: Repository<Car>;

  constructor() {
    this.repository = dataSource.getRepository(Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    const savedCar = await this.repository.save(car);

    return savedCar;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | null> {
    return await this.repository.findOne({ where: { license_plate } });
  }
}

export { CarsRepository };
