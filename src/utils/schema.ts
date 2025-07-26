import { z } from 'zod';

export const phoneSchema = z.string().regex(/^380(50|63|66|67|68|73|75|77|89|93|95|96|97|98|99)\d{7}$/);

export const stringSchema = z.string().trim().min(1);

export const uaStringSchema = z
  .string()
  .trim()
  .min(1)
  .regex(/^[А-Яа-яіїєґIЇЄҐ]+$/);

export const firstNameSchema = uaStringSchema.max(20);

export const lastNameSchema = uaStringSchema.max(20);

export const emailSchema = z.string().email().max(100);

export const passwordSchema = z
  .string()
  .min(8)
  .max(255)
  .regex(/^(?=.*[a-z])/, 'Пароль повинен містити щонайменше одну малу літеру (a-z)')
  .regex(/^(?=.*[A-Z])/, 'Пароль повинен містити щонайменше одну велику літеру (A-Z)')
  .regex(/^(?=.*\d)/, 'Пароль повинен містити щонайменше одну цифру (0-9)')
  .regex(/^(?=.*[@$!%*?&_])/, 'Пароль повинен містити щонайменше один спеціальний символ (@$!%*?&_)');
