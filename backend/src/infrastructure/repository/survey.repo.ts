import { Injectable } from "@nestjs/common";
import { StudentEntity } from "src/domain/entities/student/student.entity";
import { SurveyEntity } from "src/domain/entities/university_dept/survey.entity";
import { DataSource, LessThan, MoreThan, Not, Repository } from "typeorm";

@Injectable()
export class SurveyRepository extends Repository<SurveyEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(SurveyEntity, dataSource.createEntityManager());
    }

    async createSurvey(body: Partial<SurveyEntity>) {
        const survey = this.create(body);
        return await this.save(survey);
    }

    async findByUuid(uuid: string) {
        const survey = await this.findOne({
            where: {
                uuid: uuid
            },
        });
        return survey;
    }

    async deleteSurvey(uuid: string) {
        return await this.softDelete({ uuid });
    }

    async getSurveys(offset?: number, limit?: number) {
        const [data, total] = await this.findAndCount({
            order: {
                created_at: "DESC",
            },
            skip: offset || Number(process.env.page_offset) || 0,
            take: limit || Number(process.env.page_limit) || 10,
        });

        return { data, total };
    }

    async getStudentSurveys(student: StudentEntity, offset?: number, limit?: number) {
        const [data, total] = await this.findAndCount({
            where: {
                end_date: MoreThan(new Date()),
                start_date: LessThan(new Date()),
                target_program: student.program
            },
            order: {
                created_at: "DESC",
            },
            skip: offset || Number(process.env.page_offset) || 0,
            take: limit || Number(process.env.page_limit) || 10,
        });

        return { data, total };
    }
}