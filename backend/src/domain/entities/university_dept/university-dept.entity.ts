import { UniversityDepartmentRoleEnum } from "src/domain/enums/university.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SurveyEntity } from "./survey.entity";

@Entity('university_department')
export class UniversityDepartmentEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: UniversityDepartmentRoleEnum,
        default: UniversityDepartmentRoleEnum.TEACHER,
    })
    role: UniversityDepartmentRoleEnum;

    @OneToMany(() => SurveyEntity, (survey) => survey.creator)
    surveys: SurveyEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}