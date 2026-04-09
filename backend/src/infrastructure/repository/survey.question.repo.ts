import { Injectable } from "@nestjs/common";
import { SurveyQuestionEntity } from "src/domain/entities/university_dept/survey.question.entity";
import { DataSource, Not, Repository } from "typeorm";

@Injectable()
export class SurveyQuestionRepository extends Repository<SurveyQuestionEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(SurveyQuestionEntity, dataSource.createEntityManager());
    }

    async createSurveyQuestion(body: Partial<SurveyQuestionEntity>) {
        const surveyQuestion = this.create(body);
        return await this.save(surveyQuestion);
    }

    async findByUuid(uuid: string) {
        const survey = await this.findOne({
            where: {
                uuid: uuid
            },
        });
        return survey;
    }

    async deleteSurveyQuestion(uuid: string) {
        return await this.softDelete({ uuid });
    }

}