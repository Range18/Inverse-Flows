import { get } from 'env-var';

export const storageConfig = {
  path: get('STORAGE_PATH').required().asString(),
};
