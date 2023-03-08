import { container } from "tsyringe";

import { type IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

let provider = "ethereal";

if (process.env.MAIL_PROVIDER != null) {
  provider = process.env.MAIL_PROVIDER;
}

container.registerInstance<IMailProvider>(
  "MailProvider",
  mailProvider[provider]
);
