import { IsArray, IsNotEmpty, IsString, ValidateNested, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

class ResponseEntryDto {
    @IsUUID()
    @IsNotEmpty()
    question_uuid: string;

    @IsString()
    @IsNotEmpty()
    answer: string;
}

export class CreateStudentResponseDto {
    @IsUUID()
    @IsNotEmpty()
    survey_uuid: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ResponseEntryDto)
    responses: ResponseEntryDto[];
}