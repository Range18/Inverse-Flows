export namespace AllExceptions {
  export enum AuthExceptions {
    AccountIsNotVerified = 'Почта не подтверждена. Подтвердите пожалуйста свою почту',
    WrongPassword = 'Неверный пароль',
    ExpiredToken = 'Токен истёк',
    InvalidAccessToken = 'Неверный токен',
  }

  export enum SessionExceptions {
    SessionNotFound = 'Сессия не найдена ',
    SessionExpired = 'Сессия истекла',
  }

  export enum UserExceptions {
    UserNotFound = 'Пользователь не найден',
    UserAlreadyExists = 'Такой пользователь уже существует. Попробуйте другую почту или номер телефона',
  }

  export enum CategoryExceptions {
    CategoryNotFound = 'Категория не найдена',
  }

  export enum DocumentExceptions {
    DocumentNotFound = 'Документ не найден',
  }

  export enum ProposalExceptions {
    ProposalNotFound = 'Заявка не найдена',
    ProposalInWork = 'Отклонение заявки невозможно, т.к. она уже в работе или выполнена',
    ProposalIsRejected = 'Заявка отклонена',
  }

  export enum PostExceptions {
    PostNotFound = 'Заявка не найдена',
  }

  export enum PermissionExceptions {
    NotTheSameUser = 'Недостаточно прав',
    NoRequiredRole = 'Недостаточно прав',
  }

  export enum DepartmentExceptions {
    DepartmentNotFound = 'Отдел не найден',
  }

  export enum StorageExceptions {
    ExtNotAllowed = 'Этот тип файла не доступен для загрузки',
  }
}
