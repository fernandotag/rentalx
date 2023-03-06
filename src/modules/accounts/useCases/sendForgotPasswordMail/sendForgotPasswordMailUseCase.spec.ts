import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./sendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Password Mail", () => {
  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  beforeEach(() => {
    usersRepositoryInMemory.users = [];
    usersTokensRepositoryInMemory.usersTokens = [];
  });

  it("should be able to send forgot password mail to use", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "432565",
      email: "johndoe@example.com",
      name: "John Doe",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("johndoe@example.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send forgot password mail if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("johndoe@example.com")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    await usersRepositoryInMemory.create({
      driver_license: "432565",
      email: "johndoe@example.com",
      name: "John Doe",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("johndoe@example.com");

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
