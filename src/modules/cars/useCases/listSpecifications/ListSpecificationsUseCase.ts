import { type Specification } from "../../entities/Specification";
import { type ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

class ListSpecificationsUseCase {
  constructor(
    private readonly specificationsRepository: ISpecificationsRepository
  ) {}

  execute(): Specification[] {
    const specifications = this.specificationsRepository.list();
    return specifications;
  }
}

export { ListSpecificationsUseCase };
