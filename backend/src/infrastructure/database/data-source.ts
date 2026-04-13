//Data-Source imports
import { DataSource, DataSourceOptions } from "typeorm";
import 'dotenv/config';

//Entities
import { UniversityDepartmentEntity } from "src/domain/entities/university_dept/university-dept.entity";
import { SurveyEntity } from "src/domain/entities/university_dept/survey.entity";
import { SurveyQuestionEntity } from "src/domain/entities/university_dept/survey.question.entity";
import { SurveyOptionEntity } from "src/domain/entities/university_dept/survey.option.entity";
import { StudentResponseEntity } from "src/domain/entities/student/response.entity";
import { StudentEntity } from "src/domain/entities/student/student.entity";
import { StudentResponseEntry } from "src/domain/entities/student/response.entry.entity";

const options: DataSourceOptions = {
    type: process.env.DB_POSTGRES_TYPE as any,
    host: process.env.DB_POSTGRES_HOST,
    port: process.env.DB_POSTGRES_PORT as any,
    username: process.env.DB_POSTGRES_USERNAME,
    password: process.env.DB_POSTGRES_PASSWORD,
    database: process.env.DB_POSTGRES_DATABASE,
    entities: [
        UniversityDepartmentEntity, SurveyEntity, SurveyQuestionEntity, SurveyOptionEntity,
        StudentEntity, StudentResponseEntity, StudentResponseEntry
    ],
    synchronize: false,
    migrations: ['dist/infrastructure/database/migrations/*{.ts,.js}'],
    ssl: {
        rejectUnauthorized: true,
        ca: process.env.DB_CA_CERT,
    },
};

const dataSource = new DataSource(options);

export { dataSource, options };