import { type ICreateCarDTO } from "../dtos/ICreateCarsDTO";
import { type Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create: (data: ICreateCarDTO) => Promise<Car>;
  findByLicensePlate: (license_plate: string) => Promise<Car | null>;
  findAllAvailable: (
    brand?: string,
    category_id?: string,
    name?: string
  ) => Promise<Car[]>;
}

export type { ICarsRepository };
