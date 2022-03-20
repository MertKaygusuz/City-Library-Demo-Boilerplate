import * as bcrypt from 'bcrypt';

export function createPasswordHash(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function checkPasswordHash(
  password: string,
  hashOfPassword: string,
): boolean {
  return bcrypt.compareSync(password, hashOfPassword);
}
