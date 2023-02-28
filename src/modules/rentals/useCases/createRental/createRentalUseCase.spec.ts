import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./createRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
  beforeAll(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  beforeEach(() => {
    rentalsRepositoryInMemory.rentals = [];
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "1234",
      user_id: "1234",
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another rental open to the same user", async () => {
    await createRentalUseCase.execute({
      car_id: "1234",
      user_id: "1234",
      expected_return_date: new Date(),
    });

    await expect(async () => {
      await createRentalUseCase.execute({
        car_id: "5677",
        user_id: "1234",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another rental open to the same car", async () => {
    await createRentalUseCase.execute({
      car_id: "1234",
      user_id: "1234",
      expected_return_date: new Date(),
    });

    await expect(async () => {
      await createRentalUseCase.execute({
        car_id: "1234",
        user_id: "1223",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
