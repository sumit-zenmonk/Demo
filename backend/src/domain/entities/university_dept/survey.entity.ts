import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UniversityDepartmentEntity } from "./university-dept.entity";
import { SurveyQuestionEntity } from "./survey.question.entity";

@Entity('survey')
export class SurveyEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: "uuid" })
    creator_uuid: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    target_program: string;

    @Column({ type: 'date' })
    start_date: Date;

    @Column({ type: 'date' })
    end_date: Date;

    @ManyToOne(() => UniversityDepartmentEntity, (dept) => dept.surveys)
    @JoinColumn({ name: 'creator_uuid' })
    creator: UniversityDepartmentEntity;

    @OneToMany(() => SurveyQuestionEntity, (q) => q.survey, { eager: true })
    questions: SurveyQuestionEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}