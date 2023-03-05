import { type Repository } from "typeorm";

import { type ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { type IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { dataSource } from "@shared/infra/typeorm";

import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  private readonly repository: Repository<UserTokens>;

  constructor() {
    this.repository = dataSource.getRepository(UserTokens);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens | null> {
    const usersTokens = await this.repository.findOneBy({
      user_id,
      refresh_token,
    });
    return usersTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens | null> {
    const userToken = await this.repository.findOneBy({ refresh_token });

    return userToken;
  }
}

export { UsersTokensRepository };
