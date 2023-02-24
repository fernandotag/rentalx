import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeAll(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  beforeEach(() => {
    carsRepositoryInMemory.cars = [];
  });

  it("should be able to list all available cars", async () => {
    await carsRepositoryInMemory.create({
      brand: "Fiat",
      category_id: "category-id",
      daily_rate: 100,
      description: "Caro mais vendido da marca",
      fine_amount: 10,
      license_plate: "ABC-1234",
      name: "Fiat Toro",
    });

    const car = await carsRepositoryInMemory.create({
      brand: "VW",
      category_id: "category-id",
      daily_rate: 100,
      description: "Caro mais vendido da marca",
      fine_amount: 10,
      license_plate: "ABC-1235",
      name: "T-Cross",
    });

    carsRepositoryInMemory.cars[0].available = false;

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Fiat",
      category_id: "category-id",
      daily_rate: 100,
      description: "Caro mais vendido da marca",
      fine_amount: 10,
      license_plate: "ABC-1234",
      name: "Fiat Toro",
    });

    await carsRepositoryInMemory.create({
      brand: "VW",
      category_id: "category-id",
      daily_rate: 100,
      description: "Caro mais vendido da marca",
      fine_amount: 10,
      license_plate: "ABC-1235",
      name: "T-Cross",
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: "Fiat" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Fiat",
      category_id: "category-1",
      daily_rate: 100,
      description: "Caro mais vendido da marca",
      fine_amount: 10,
      license_plate: "ABC-1234",
      name: "Fiat Toro",
    });

    await carsRepositoryInMemory.create({
      brand: "VW",
      category_id: "category-2",
      daily_rate: 100,
      description: "Caro mais vendido da marca",
      fine_amount: 10,
      license_plate: "ABC-1235",
      name: "T-Cross",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category-1",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    await carsRepositoryInMemory.create({
      brand: "Fiat",
      category_id: "category-1",
      daily_rate: 100,
      description: "Caro mais vendido da marca",
      fine_amount: 10,
      license_plate: "ABC-1234",
      name: "Fiat Toro",
    });

    const car = await carsRepositoryInMemory.create({
      brand: "VW",
      category_id: "category-2",
      daily_rate: 100,
      description: "Caro mais vendido da marca",
      fine_amount: 10,
      license_plate: "ABC-1235",
      name: "T-Cross",
    });

    const cars = await listAvailableCarsUseCase.execute({ name: "T-Cross" });

    expect(cars).toEqual([car]);
  });
});
