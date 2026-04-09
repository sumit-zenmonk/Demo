import { IsString, IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    // @IsEnum(Role)
    // role: Role.USER;
}