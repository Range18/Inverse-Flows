import { UserEntity } from '#src/core/users/entity/user.entity';
import { GetUserRdo } from '#src/core/users/rdo/get-user.rdo';

export class GetMeRdo extends GetUserRdo {
  email: string;

  phone: string;

  constructor(user: UserEntity) {
    super(user);
    this.email = user.email;
    this.phone = user.phone;
  }
}
