import { Injectable } from "@nestjs/common";
import { SurveyOptionEntity } from "src/domain/entities/university_dept/survey.option.entity";
import { DataSource, Not, Repository } from "typeorm";

@Injectable()
export class SurveyOptionRepository extends Repository<SurveyOptionEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(SurveyOptionEntity, dataSource.createEntityManager());
    }

    async createSurveyOption(
        body: Partial<SurveyOptionEntity> | Partial<SurveyOptionEntity>[]
    ) {
        if (Array.isArray(body)) {
            const surveyOptions = this.create(body);
            return await this.save(surveyOptions);
        } else {
            const surveyOption = this.create(body);
            return await this.save(surveyOption);
        }
    }

    async findByUuid(uuid: string) {
        const survey = await this.findOne({
            where: {
                uuid: uuid
            },
        });
        return survey;
    }

    async deleteSurveyOption(uuid: string) {
        return await this.softDelete({ uuid });
    }

}