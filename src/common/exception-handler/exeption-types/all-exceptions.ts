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
    ProposalInWork = 'Proposal rejection (revision) is impossible because it`s already in work or done',
    ProposalIsRejected = 'Proposal is rejected',
  }

  export enum PostExceptions {
    PostNotFound = 'Post is not found',
  }

  export enum PermissionExceptions {
    NotTheSameUser = 'Action is forbidden because user is not owner',
    NoRequiredRole = 'You are not allowed to do that action, because of your role',
  }

  export enum DepartmentExceptions {
    DepartmentNotFound = 'Department is not found',
  }

  export enum StorageExceptions {
    ExtNotAllowed = 'File extension is not allowed',
  }

  export enum Queries {
    InvalidLimitOffset = 'limit * offset - offset can`t be < 0',
  }
}
