import 'dotenv/config';
import { get } from 'env-var';

export const textGenerationConfig = {
  OAuthToken: get('OAUTH_TOKEN').asString(),
  token: get('IAM_TOKEN').asString(),
  folderId: get('FOLDER_ID').asString(),
};
