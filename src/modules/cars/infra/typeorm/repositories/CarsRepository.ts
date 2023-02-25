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
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
      id,
    });

    const savedCar = await this.repository.save(car);

    return savedCar;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | null> {
    return await this.repository.findOneBy({ license_plate });
  }

  async findAllAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

    if (brand != null) {
      carsQuery.andWhere("brand = :brand", { brand });
    }

    if (name != null) {
      carsQuery.andWhere("name = :name", { name });
    }

    if (category_id != null) {
      carsQuery.andWhere("category_id = :category_id", { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car | null> {
    const car = await this.repository.findOneBy({ id });
    return car;
  }
}

export { CarsRepository };
