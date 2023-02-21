import { type Specification } from "../entities/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  findByName: (name: string) => Promise<Specification | null>;
  list: () => Promise<Specification[]>;
  create: ({ name, description }: ICreateSpecificationDTO) => Promise<void>;
}

export type { ISpecificationsRepository, ICreateSpecificationDTO };
