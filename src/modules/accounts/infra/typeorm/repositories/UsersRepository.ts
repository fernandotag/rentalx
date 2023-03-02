import { type Repository } from "typeorm";

import { type ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { type IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { dataSource } from "@shared/infra/typeorm";

class UsersRepository implements IUsersRepository {
  private readonly repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  async create({
    id,
    name,
    email,
    driver_license,
    password,
    avatar,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      id,
      name,
      email,
      driver_license,
      password,
      avatar,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ email });
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ id });
    return user;
  }
}

export { UsersRepository };
