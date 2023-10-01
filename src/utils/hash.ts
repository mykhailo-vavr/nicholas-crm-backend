import { hash as bcryptHash, compare } from 'bcrypt';

export const hash = async (password: string, saltRounds = 10) =>
  bcryptHash(password, saltRounds);

export const validateHash = (password: string, hashedPassword: string) =>
  compare(password, hashedPassword);
