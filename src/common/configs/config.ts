import 'dotenv/config';
import { get } from 'env-var';
import ms from 'ms';

export const backendServer = {
  host: get('BACKEND_HOST').default('localhost').asString(),
  port: get('BACKEND_PORT').default(3000).asPortNumber(),
  urlValue: get('BACKEND_URL').required().asString(),
};

export const frontendServer = {
  url: get('FRONTEND_URL').asString(),
  devPort: get('DEV_PORT').required().asPortNumber(),
};

export const jwtConfig = {
  refreshExpire: {
    ms() {
      return ms(this.value);
    },
    value: get('REFRESH_EXPIRE').asString(),
  },
  accessExpire: {
    ms() {
      return ms(this.value);
    },
    value: get('ACCESS_EXPIRE').asString(),
  },
  secret: get('SECRET').required().asString(),
};

export const passwordSaltRounds: number = get('PASS_SALT_ROUNDS')
  .default(10)
  .asInt();
