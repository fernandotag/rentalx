import { inject, injectable } from "tsyringe";

import { type Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { type IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { type IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private readonly rentalsRepository: IRentalsRepository,

    @inject("DayjsDateProvider")
    private readonly dateProvider: IDateProvider
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<Rental | null> {
    const minimumRentalPeriod = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable != null) {
      throw new AppError("Car is unavailable");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser != null) {
      throw new AppError("There is a rental in progress for user!");
    }

    const compare = this.dateProvider.compareInHours(
      new Date(),
      expected_return_date
    );

    if (compare < minimumRentalPeriod) {
      throw new AppError("Invalid minimum rental period");
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
