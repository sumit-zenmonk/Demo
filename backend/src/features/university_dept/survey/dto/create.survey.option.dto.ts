import { IsNotEmpty, IsString } from "class-validator";

export class CreateSurveyOptionDto {
    @IsString()
    @IsNotEmpty()
    option: string;
}