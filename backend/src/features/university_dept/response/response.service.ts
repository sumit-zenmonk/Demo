import { BadRequestException, Injectable } from "@nestjs/common";
import { StudentEntity } from "src/domain/entities/student/student.entity";
import { StudentResponseRepository } from "src/infrastructure/repository/student.response.repo";
import { SurveyRepository } from "src/infrastructure/repository/survey.repo";

@Injectable()
export class ResponseService {
    constructor(
        private readonly studentResponseRepo: StudentResponseRepository
    ) { }

    async getStudentResponses(offset?: number, limit?: number) {
        const surveys = await this.studentResponseRepo.getResponses(offset, limit);
        return {
            data: surveys,
            message: "Fetched Responses"
        }
    }

} 