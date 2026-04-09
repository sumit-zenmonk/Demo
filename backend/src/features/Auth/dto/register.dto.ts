import { IsString, IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { UniversityDepartmentRoleEnum } from 'src/domain/enums/university.enum';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsEnum(UniversityDepartmentRoleEnum)
    role: UniversityDepartmentRoleEnum.TEACHER;
}