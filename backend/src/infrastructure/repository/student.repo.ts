import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { StudentEntity } from "src/domain/entities/student/student.entity";

@Injectable()
export class StudentRepository extends Repository<StudentEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(StudentEntity, dataSource.createEntityManager());
    }

    async findByEmail(email: string) {
        return await this.findOne({
            where: { email },
            select: {
                uuid: true,
                name: true,
                email: true,
                card_uuid: true,
                role: true,
                program: true,
            }
        });
    }

    async findByEmailAndCard(email: string, card_uuid: string) {
        return await this.findOne({
            where: {
                email,
                card_uuid
            },
            select: {
                uuid: true,
                name: true,
                email: true,
                card_uuid: true,
                role: true,
                program: true,
            }
        });
    }

    async findByUuid(uuid: string) {
        return await this.findOne({
            where: {
                uuid: uuid
            },
            select: {
                email: true,
                name: true,
                uuid: true,
                role: true,
                card_uuid: true,
                program: true,
            }
        });
    }
}