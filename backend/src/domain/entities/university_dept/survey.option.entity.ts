import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SurveyQuestionEntity } from "./survey.question.entity";

@Entity('survey_option')
export class SurveyOptionEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: "uuid" })
    question_uuid: string;

    @Column()
    option: string;

    @ManyToOne(() => SurveyQuestionEntity, (q) => q.options)
    @JoinColumn({ name: 'question_uuid' })
    question: SurveyQuestionEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}