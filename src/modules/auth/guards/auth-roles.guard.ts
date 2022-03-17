import { applyDecorators, UseGuards } from '@nestjs/common';
import { RequiredRoles } from '../decorators/required-roles.decorator';
import { GqlAuthGuard } from './gql-auth.guard';
import { RolesGuard } from './roles.guard';

export function AuthRolesGuard(...roles: string[]) {
  return applyDecorators(
    RequiredRoles(...roles),
    UseGuards(GqlAuthGuard, RolesGuard),
  );
}
