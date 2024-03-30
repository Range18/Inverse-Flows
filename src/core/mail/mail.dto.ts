import { mailMessages, mailSubjects } from '../mail/mail.constants';
import { MailPayload, MailType } from '#src/core/mail/types/mail.types';

export class MailDto<T extends MailType> {
  mailType: T;
  recipient: string;
  subject: string;
  message: string;

  constructor(mailType: T, recipient: string, data: MailPayload[T]) {
    this.mailType = mailType;
    this.recipient = recipient;

    switch (this.mailType) {
      case 'sendCredentials':
        this.subject = mailSubjects.sendCredentials;
        this.message = mailMessages.sendCredentials.createMessage(data);
        break;

      default:
        this.subject = 'Тестовая рассылка';
        this.message = `<p>Тестовая рассылка</p>`;
        break;
    }
  }
}
