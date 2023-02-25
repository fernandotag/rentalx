import { inject, injectable } from "tsyringe";

import { type ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImageRepository")
    private readonly carsImagesRepository: ICarsImageRepository
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
    });
  }
}
export { UploadCarImagesUseCase };
