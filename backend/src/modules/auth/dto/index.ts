import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail() email: string;
  @IsString() @MinLength(4) password: string;
  @IsString() name: string;
}

export class LoginDto {
  @IsEmail() email: string;
  @IsString() password: string;
}
