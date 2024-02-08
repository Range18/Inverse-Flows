import { join } from 'path';
import * as process from 'process';

export const storageConfig = {
  path: join(process.cwd(), 'storage'),
};
