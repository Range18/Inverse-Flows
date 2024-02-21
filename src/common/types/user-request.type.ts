import { UserEntity } from '#src/core/users/user.entity';

export type UserRequest = Pick<
  UserEntity,
  'id' | 'firstname' | 'surname' | 'email' | 'role'
>;
