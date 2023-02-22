import { type ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { type User } from "../entities/User";

interface IUsersRepository {
  create: (data: ICreateUserDTO) => Promise<void>;
  findByEmail: (email: string) => Promise<User | null>;
  findById: (id: string) => Promise<User | null>;
}

export type { IUsersRepository };
