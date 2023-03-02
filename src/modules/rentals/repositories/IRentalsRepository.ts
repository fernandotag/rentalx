import { type ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { type Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  findOpenRentalByCar: (car_id: string) => Promise<Rental | null>;
  findOpenRentalByUser: (user_id: string) => Promise<Rental | null>;
  create: ({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO) => Promise<Rental | null>;
  findById: (id: string) => Promise<Rental | null>;
  findByUser: (user_id: string) => Promise<Rental[]>;
}

export type { IRentalsRepository };
