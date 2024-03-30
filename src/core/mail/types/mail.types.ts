export type MailType = 'sendCredentials';

export type MailSubjects = {
  [key in MailType]: string;
};

export type MailMessages = {
  [key in MailType]: { createMessage(data: unknown): string };
};

export type MailPayload = {
  sendCredentials: { login: string; password: string };
};
