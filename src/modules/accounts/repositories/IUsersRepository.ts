import { type ICreateUserDTO } from "../dtos/ICreateUserDTO";

interface IUsersRepository {
  create: (data: ICreateUserDTO) => Promise<void>;
}

export type { IUsersRepository };
