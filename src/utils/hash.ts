import { compare, hash as hashOriginal } from 'bcrypt';

export async function hash(password: string, saltRounds = 10) {
  return hashOriginal(password, saltRounds);
}

export async function validateHash(password: string, hashedPassword: string) {
  return compare(password, hashedPassword);
}
