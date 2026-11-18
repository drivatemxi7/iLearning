import { IsEmail, IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
  @IsString() @MinLength(2) @MaxLength(100)
  fullName: string;

  @IsEmail() @MaxLength(150)
  email: string;

  @IsOptional() @IsString() @MaxLength(30)
  phone?: string;

  @IsString() @MinLength(10) @MaxLength(72)
  password: string;
}
