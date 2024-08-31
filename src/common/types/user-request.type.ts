import { UserEntity } from '#src/core/users/entity/user.entity';

export type UserRequest = Pick<
  UserEntity,
  'id' | 'firstname' | 'surname' | 'email' | 'role'
>;
