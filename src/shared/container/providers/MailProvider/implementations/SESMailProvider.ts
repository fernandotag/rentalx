import { SES } from "aws-sdk";
import { readFile } from "fs/promises";
import handlebars from "handlebars";
import nodemailer, { type Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { type IMailProvider } from "../IMailProvider";

@injectable()
class SESMailProvider implements IMailProvider {
  private readonly client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION,
      }),
    });
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = await readFile(path, "utf8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: "Rentx <noreply@rentx.com.br>", // verified mail
      subject,
      html: templateHTML,
    });
  }
}

export { SESMailProvider };
