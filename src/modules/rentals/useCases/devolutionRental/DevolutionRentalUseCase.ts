import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { type Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private readonly rentalsRepository: IRentalsRepository,

    @inject("CarsRepository")
    private readonly carsRepository: ICarsRepository,

    @inject("DayjsDateProvider")
    private readonly dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const minimumDaily = 1;
    const dateNow = new Date();

    const rental = await this.rentalsRepository.findById(id);

    if (rental == null) throw new AppError("Rental does not exists");

    const car = await this.carsRepository.findById(rental.car_id);

    if (car == null) throw new AppError("Car does not exists");

    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);
    if (daily <= 0) daily = minimumDaily;

    let total = 0;
    const totalFine = this.calculateFine(
      car.fine_amount,
      rental.expected_return_date
    );

    total += daily * car.daily_rate + totalFine;

    rental.end_date = dateNow;
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }

  private calculateFine(fineAmount: number, expectedReturnDate: Date): number {
    const dateNow = new Date();

    const delay = this.dateProvider.compareInDays(dateNow, expectedReturnDate);

    let totalFine = 0;

    if (delay > 0) {
      totalFine = delay * fineAmount;
    }

    return totalFine;
  }
}

export { DevolutionRentalUseCase };
