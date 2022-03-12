import * as bcrypt from 'bcrypt';
const minimumPasswordLength = 8;
export function createPasswordHash(password: string): string {
  //TODO: checking the rules
  return bcrypt.hashSync(password, 10);
}

export function checkPasswordHash(
  password: string,
  hashOfPassword: string,
): boolean {
  return bcrypt.compareSync(password, hashOfPassword);
}
