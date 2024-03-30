import { BadRequestException, Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { MailDto } from './mail.dto';
import { smtpConfig } from '#src/common/configs/smtp.config';
import { MailType } from '#src/core/mail/types/mail.types';

@Injectable()
export class MailService {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = createTransport(smtpConfig);
  }

  private async sendEMail<T extends MailType>(mailDto: MailDto<T>) {
    await this.transporter
      .sendMail({
        from: smtpConfig.from,
        to: mailDto.recipient,
        subject: mailDto.subject,
        text: mailDto.message,
      })
      .catch(async (err) => {
        await this.transporter.sendMail({
          from: smtpConfig.from,
          to: smtpConfig.from,
          subject: 'Fatal error while sending email',
          text: err,
        });
        throw new BadRequestException(err['code'], { cause: err['response'] });
      });
  }

  async sendCredentials(recipient: string, password: string) {
    await this.sendEMail(
      new MailDto('sendCredentials', recipient, {
        login: recipient,
        password: password,
      }),
    );
  }
}
