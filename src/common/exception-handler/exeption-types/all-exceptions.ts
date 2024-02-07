export namespace AllExceptions {
  export enum AuthExceptions {
    AccountIsNotVerified = 'Account is not verified. Please verify your email.',
    WrongPassword = 'Wrong password',
    ExpiredToken = 'Access token expired',
    InvalidAccessToken = 'Invalid access token',
  }

  export enum SessionExceptions {
    SessionNotFound = 'Session not found',
    SessionExpired = 'Session expired',
  }

  export enum UserExceptions {
    UserNotFound = 'User not found',
    UserAlreadyExists = 'User already exists',
  }
}
