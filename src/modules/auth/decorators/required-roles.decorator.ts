import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const RequiredRoles = (...requiredRoles: string[]) =>
  SetMetadata(ROLES_KEY, requiredRoles);
