import { Module } from "@nestjs/common";
import { SurveyController } from "./survey.controller";
import { SurveyService } from "./survey.service";
import { SurveyRepository } from "src/infrastructure/repository/survey.repo";

@Module({
    imports: [],
    controllers: [SurveyController],
    providers: [SurveyService, SurveyRepository],
    exports: [SurveyModule],
})

export class SurveyModule { }