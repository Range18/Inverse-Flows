import { RolesEntity } from '#src/core/roles/roles.entity';

export const rolesArray: Pick<RolesEntity, 'name' | 'description'>[] = [
  { name: 'member', description: 'Yes, just a member' },
  { name: 'moderator', description: 'Yes, just a moderator' },
];
