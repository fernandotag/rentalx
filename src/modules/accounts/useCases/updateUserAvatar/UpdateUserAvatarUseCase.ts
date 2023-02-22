import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/file";
import { type IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (user != null) {
      user.avatar != null && (await deleteFile(`./tmp/avatar/${user.avatar}`));
      user.avatar = avatar_file;

      await this.usersRepository.create(user);
    }
  }
}

export { UpdateUserAvatarUseCase };
