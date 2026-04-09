import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginStudentDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    card_uuid: string;
}