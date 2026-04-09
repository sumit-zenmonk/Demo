import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateSurveyDto } from "./dto/create.survey.dto";
import { SurveyRepository } from "src/infrastructure/repository/survey.repo";
import { CreateSurveyQuestionDto } from "./dto/create.survey.question.dto";
import { SurveyQuestionRepository } from "src/infrastructure/repository/survey.question.repo";
import { SurveyOptionRepository } from "src/infrastructure/repository/survey.question.option.repo";
import { UniversityDepartmentEntity } from "src/domain/entities/university_dept/university-dept.entity";
import { SurveyQuestionTypeEnum } from "src/domain/enums/survery.enum";

@Injectable()
export class SurveyService {
    constructor(
        private readonly surveyRepo: SurveyRepository,
        private readonly surveyQuestionRepo: SurveyQuestionRepository,
        private readonly surveyOptionRepo: SurveyOptionRepository
    ) { }

    async createSurvey(dept: UniversityDepartmentEntity, body: CreateSurveyDto) {
        const survey = await this.surveyRepo.createSurvey({
            ...body,
            creator_uuid: dept.uuid,
            start_date: new Date(body.start_date),
            end_date: new Date(body.end_date)
        });

        return {
            data: survey,
            message: "Survey Created Success"
        }
    }

    async deleteSurvey(dept: UniversityDepartmentEntity, survey_uuid: string) {
        const survey = await this.surveyRepo.findByUuid(survey_uuid);
        if (!survey) {
            throw new BadRequestException("Survey Not Found");
        }

        await this.surveyRepo.deleteSurvey(survey_uuid);
        return {
            message: "Deleted Success"
        }
    }

    async getSurveys(offset?: number, limit?: number) {
        const surveys = await this.surveyRepo.getSurveys(offset, limit);
        return {
            data: surveys,
            message: "Fetched Surveyes"
        }
    }

    async createQuestion(body: CreateSurveyQuestionDto) {
        const survey = await this.surveyRepo.findByUuid(body.survey_uuid);
        if (!survey) {
            throw new BadRequestException("Survey Not Found");
        }

        const question = await this.surveyQuestionRepo.createSurveyQuestion({
            survey_uuid: body.survey_uuid,
            question: body.question,
            question_type: body.question_type,
            mandatory: body.mandatory
        });

        if (body.question_type === SurveyQuestionTypeEnum.MCQ && body.options?.length) {
            const options = body.options.map(opt => ({
                option: opt.option,
                question_uuid: question.uuid,
            }));

            await this.surveyOptionRepo.createSurveyOption(options);
        }

        return question;
    }

    async deleteQuestion(question_uuid: string) {
        const question = await this.surveyQuestionRepo.findByUuid(question_uuid);
        if (!question) {
            throw new BadRequestException("Question Not Found");
        }

        await this.surveyQuestionRepo.deleteSurveyQuestion(question_uuid);
        return {
            message: "Deleted Success"
        }
    }
} 