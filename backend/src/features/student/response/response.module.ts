import { Module } from "@nestjs/common";
import { SurveyRepository } from "src/infrastructure/repository/survey.repo";
import { SurveyQuestionRepository } from "src/infrastructure/repository/survey.question.repo";
import { SurveyOptionRepository } from "src/infrastructure/repository/survey.question.option.repo";
import { StudentResponseRepository } from "src/infrastructure/repository/student.response.repo";
import { StudentResponseEntryRepository } from "src/infrastructure/repository/student.response.entry.repo";
import { responseController } from "./response.controller";
import { ResponseService } from "./response.service";

@Module({
    imports: [],
    controllers: [responseController],
    providers: [
        ResponseService, SurveyRepository, SurveyQuestionRepository, SurveyOptionRepository,
        StudentResponseRepository, StudentResponseEntryRepository
    ],
    exports: [ResponseModule],
})

export class ResponseModule { }