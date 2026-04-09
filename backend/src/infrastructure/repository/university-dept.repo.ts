import { Injectable } from "@nestjs/common";
import { UniversityDepartmentEntity } from "src/domain/entities/university_dept/university-dept.entity";
import { RegisterDto } from "src/features/Auth/dto/register.dto";
import { DataSource, Not, Repository } from "typeorm";

@Injectable()
export class UniversityDepartmentRepository extends Repository<UniversityDepartmentEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(UniversityDepartmentEntity, dataSource.createEntityManager());
    }

    async register(body: RegisterDto) {
        const dept = this.create(body);
        return await this.save(dept);
    }

    async findByUuid(uuid: string) {
        const dept = await this.findOne({
            where: {
                uuid: uuid
            },
            select: {
                email: true,
                name: true,
                uuid: true,
                role: true
            }
        });
        return dept;
    }

    async findByEmail(email: string) {
        const dept = await this.findOne({
            where: {
                email: email
            },
            select: {
                email: true,
                name: true,
                uuid: true,
                password: true,
                role: true
            }
        });
        return dept;
    }

}