import { BadRequestException, Injectable } from "@nestjs/common";
import { SurveyRepository } from "src/infrastructure/repository/survey.repo";
import { CreateStudentResponseDto } from "./dto/create.response.dto";
import { StudentEntity } from "src/domain/entities/student/student.entity";
import { StudentResponseRepository } from "src/infrastructure/repository/student.response.repo";
import { StudentResponseEntryRepository } from "src/infrastructure/repository/student.response.entry.repo";

@Injectable()
export class ResponseService {
    constructor(
        private readonly responseRepo: StudentResponseRepository,
        private readonly responseEntryRepo: StudentResponseEntryRepository,
        private readonly surveyRepo: SurveyRepository,
    ) { }

    async createresponse(student: StudentEntity, dto: CreateStudentResponseDto) {
        const survey = await this.surveyRepo.findByUuid(dto.survey_uuid);
        if (!survey) {
            throw new BadRequestException("Survey Not Found");
        }

        const alreadySubmitted = await this.responseRepo.findByStudentAndSurvey(
            student.uuid,
            dto.survey_uuid
        );

        if (alreadySubmitted) {
            throw new BadRequestException("You already submitted this survey");
        }

        const response = await this.responseRepo.createResponse({
            student_uuid: student.uuid,
            survey_uuid: dto.survey_uuid,
        });

        const entries = dto.responses.map(res => ({
            response_uuid: response.uuid,
            question_uuid: res.question_uuid,
            answer: res.answer,
        }));

        await this.responseEntryRepo.createEntries(entries);

        return {
            message: "Survey Submitted Successfully",
            data: response,
        };
    }

    async getResponses(user: StudentEntity, offset?: number, limit?: number) {
        const surveys = await this.responseRepo.getStudentResponses(user, offset, limit);
        return {
            data: surveys,
            message: "Fetched Surveyes"
        }
    }
}