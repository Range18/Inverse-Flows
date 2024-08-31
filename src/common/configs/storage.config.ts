import { get } from 'env-var';

export const storageConfig = {
  path: get('STORAGE_PATH').required().asString(),
  innerDocuments: 'documents',
  innerAvatars: 'avatars',
  innerStatic: 'static',
  proposalAssetsDir: 'proposal-assets',
  nameLength: 12,
  defaultAvatar: get('DEFAULT_AVATAR').required().asString(),
  defaultMimetype: 'image/png',
  allowedMimetypes: ['image/jpeg', 'image/png', 'image/gif'],
  allowedFiles: {
    png: '89504E470D0A1A0A',
    jpeg: 'FFD8',
    gif: '47494638',
  },
};
