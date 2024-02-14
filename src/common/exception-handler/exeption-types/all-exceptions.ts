export namespace AllExceptions {
  export enum AuthExceptions {
    AccountIsNotVerified = 'Account is not verified. Please verify your email.',
    WrongPassword = 'Wrong password',
    ExpiredToken = 'Access token expired',
    InvalidAccessToken = 'Invalid access token',
  }

  export enum SessionExceptions {
    SessionNotFound = 'Session is not found',
    SessionExpired = 'Session expired',
  }

  export enum UserExceptions {
    UserNotFound = 'User is not found',
    UserAlreadyExists = 'User already exists',
  }

  export enum CategoryExceptions {
    CategoryNotFound = 'Category is not found',
    UserAlreadyExists = 'Category already exists',
  }

  export enum DocumentExceptions {
    DocumentNotFound = 'Document is not found',
  }

  export enum ProposalExceptions {
    ProposalNotFound = 'Proposal is not found',
  }

  export enum PermissionExceptions {
    NotTheSameUser = 'Action is forbidden because user in entity is different.',
  }

  export enum DepartmentExceptions {
    DepartmentNotFound = 'Department is not found',
  }

  export enum Queries {
    InvalidLimitOffset = 'limit * offset - offset can`t be < 0',
  }
}
