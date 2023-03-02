import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./createRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const tomorrow = dayjs().add(1, "day").toDate();

  beforeAll(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  beforeEach(() => {
    rentalsRepositoryInMemory.rentals = [];
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "New car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-2331",
      fine_amount: 60,
      brand: "Brand Name",
      category_id: "category",
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "1234",
      expected_return_date: tomorrow,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another rental open to the same user", async () => {
    await createRentalUseCase.execute({
      car_id: "1234",
      user_id: "1234",
      expected_return_date: tomorrow,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "5677",
        user_id: "1234",
        expected_return_date: tomorrow,
      })
    ).rejects.toEqual(new AppError("There is a rental in progress for user!"));
  });

  it("should not be able to create a new rental if there is another rental open to the same car", async () => {
    await createRentalUseCase.execute({
      car_id: "1234",
      user_id: "1234",
      expected_return_date: tomorrow,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "1234",
        user_id: "1223",
        expected_return_date: tomorrow,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: "1234",
        user_id: "1223",
        expected_return_date: new Date(),
      })
    ).rejects.toEqual(new AppError("Invalid minimum rental period"));
  });
});
