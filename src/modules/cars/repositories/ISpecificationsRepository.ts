import { type Specification } from "../entities/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  findByName: (name: string) => Specification;
  list: () => Specification[];
  create: ({ name, description }: ICreateSpecificationDTO) => void;
}

export type { ISpecificationsRepository, ICreateSpecificationDTO };
