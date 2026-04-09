import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateIf, ValidateNested, ArrayMinSize, IsBoolean } from "class-validator";
import { Type } from "class-transformer";
import { SurveyQuestionTypeEnum } from "src/domain/enums/survery.enum";
import { CreateSurveyOptionDto } from "./create.survey.option.dto";

export class CreateSurveyQuestionDto {
    @IsUUID()
    survey_uuid: string;

    @IsString()
    @IsNotEmpty()
    question: string;

    @IsOptional()
    @IsBoolean()
    mandatory: boolean;

    @IsEnum(SurveyQuestionTypeEnum)
    question_type: SurveyQuestionTypeEnum;

    @ValidateIf((o) => o.question_type === SurveyQuestionTypeEnum.MCQ)
    @ValidateNested({ each: true })
    @Type(() => CreateSurveyOptionDto)
    @ArrayMinSize(1)
    options?: CreateSurveyOptionDto[];
}