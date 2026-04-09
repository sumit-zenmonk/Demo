import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { StudentResponseEntity } from "src/domain/entities/student/response.entity";
import { StudentEntity } from "src/domain/entities/student/student.entity";

@Injectable()
export class StudentResponseRepository extends Repository<StudentResponseEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(StudentResponseEntity, dataSource.createEntityManager());
    }

    async createResponse(body: Partial<StudentResponseEntity>) {
        const response = this.create(body);
        return await this.save(response);
    }

    async findByStudentAndSurvey(student_uuid: string, survey_uuid: string) {
        return await this.findOne({
            where: {
                student_uuid,
                survey_uuid,
            },
        });
    }

    async getStudentResponses(user: StudentEntity, offset?: number, limit?: number) {
        const [data, total] = await this.findAndCount({
            where: {
                student_uuid: user.uuid
            },
            relations: {
                student: true,
                entries: true,
            },
            order: {
                created_at: "DESC",
            },
            skip: offset || Number(process.env.page_offset) || 0,
            take: limit || Number(process.env.page_limit) || 10,
        });

        return { data, total };
    }

    async getResponses(offset?: number, limit?: number) {
        const [data, total] = await this.findAndCount({
            relations: {
                student: true,
                entries: true,
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