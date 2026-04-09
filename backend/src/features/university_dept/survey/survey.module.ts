import { Module } from "@nestjs/common";
import { SurveyController } from "./survey.controller";
import { SurveyService } from "./survey.service";
import { SurveyRepository } from "src/infrastructure/repository/survey.repo";
import { SurveyQuestionRepository } from "src/infrastructure/repository/survey.question.repo";
import { SurveyOptionRepository } from "src/infrastructure/repository/survey.question.option.repo";

@Module({
    imports: [],
    controllers: [SurveyController],
    providers: [SurveyService, SurveyRepository, SurveyQuestionRepository, SurveyOptionRepository],
    exports: [SurveyModule],
})

export class SurveyModule { }