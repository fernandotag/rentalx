import { inject, injectable } from "tsyringe";

import { type IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { userToDTO } from "@modules/accounts/mapper/UserMap";
import { type IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IUserResponseDTO | null> {
    const user = await this.usersRepository.findById(id);

    if (user == null) throw new AppError("User does not exists!");

    return userToDTO(user);
  }
}

export { ProfileUserUseCase };
