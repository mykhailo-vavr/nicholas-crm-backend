import { IsEmail, IsPhoneNumber } from 'class-validator';

export class IsUserTakenQuery {
  @IsEmail()
  email: string;

  @IsPhoneNumber('UA')
  phone: string;
}
