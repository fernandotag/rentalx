import { type ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { type UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokensRepository {
  create: ({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO) => Promise<UserTokens>;

  findByUserIdAndRefreshToken: (
    user_id: string,
    refresh_token: string
  ) => Promise<UserTokens | null>;

  deleteById: (id: string) => Promise<void>;

  findByRefreshToken: (refresh_token: string) => Promise<UserTokens | null>;
}

export type { IUsersTokensRepository };
