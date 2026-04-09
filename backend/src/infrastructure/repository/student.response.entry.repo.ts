import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { StudentResponseEntry } from "src/domain/entities/student/response.entry.entity";

@Injectable()
export class StudentResponseEntryRepository extends Repository<StudentResponseEntry> {
    constructor(private readonly dataSource: DataSource) {
        super(StudentResponseEntry, dataSource.createEntityManager());
    }

    async createEntries(entries: Partial<StudentResponseEntry>[]) {
        const data = this.create(entries);
        return await this.save(data);
    }
}