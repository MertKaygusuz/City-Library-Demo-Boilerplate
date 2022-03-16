import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
const minimumPasswordLength = 8;
export function createPasswordHash(password: string): string {
  if (password.length < minimumPasswordLength)
    throw new BadRequestException(
      `Your password must compose of minimum ${minimumPasswordLength} characters`,
    );
  return bcrypt.hashSync(password, 10);
}

export function checkPasswordHash(
  password: string,
  hashOfPassword: string,
): boolean {
  return bcrypt.compareSync(password, hashOfPassword);
}
