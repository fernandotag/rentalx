import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeAll(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  beforeEach(() => {
    carsRepositoryInMemory.cars = [];
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "New car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-2331",
      fine_amount: 60,
      brand: "Brand Name",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "New car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-2331",
      fine_amount: 60,
      brand: "Brand Name",
      category_id: "category",
    });

    await expect(async () => {
      await createCarUseCase.execute({
        name: "New car 2",
        description: "Description car 2",
        daily_rate: 300,
        license_plate: "ABC-2331",
        fine_amount: 70,
        brand: "Brand Name 2",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car available",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-2331",
      fine_amount: 60,
      brand: "Brand Name",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
