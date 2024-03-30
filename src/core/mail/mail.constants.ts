import {
  MailMessages,
  MailPayload,
  MailSubjects,
} from '#src/core/mail/types/mail.types';

export const mailSubjects: Readonly<MailSubjects> = {
  sendCredentials:
    'Сервис для подачи идей по оптимизации процессов в Жизньмарте',
};

export const mailMessages: Readonly<MailMessages> = {
  sendCredentials: {
    createMessage(data: MailPayload['sendCredentials']) {
      return (
        'Здравствуйте!\n' +
        '\n' +
        ' \n' +
        '\n' +
        'Недавно мы отправляли форму, чтобы получить данные о сотрудниках Жизньмарта для создания аккаунтов на новом сервисе, где ты сможешь подавать идеи для оптимизации процессов в магазинах сети. \n' +
        '\n' +
        ' \n' +
        '\n' +
        'Ссылка на сервис — https://postideas.ru/\n' +
        '\n' +
        ' \n' +
        '\n' +
        `Ваш логин: ${data.login}\n` +
        `Ваш пароль: ${data.password}`
      );
    },
  },
};
