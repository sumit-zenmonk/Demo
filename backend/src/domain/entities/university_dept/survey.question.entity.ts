import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SurveyEntity } from "./survey.entity";
import { SurveyOptionEntity } from "./survey.option.entity";
import { SurveyQuestionTypeEnum } from "src/domain/enums/survery.enum";

@Entity('survey_question')
export class SurveyQuestionEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: "uuid" })
    survey_uuid: string;

    @Column()
    question: string;

    @Column({ type: "boolean", default: false })
    mandatory: boolean;

    @Column({
        type: 'enum',
        enum: SurveyQuestionTypeEnum,
        default: SurveyQuestionTypeEnum.INPUT,
    })
    question_type: SurveyQuestionTypeEnum;

    @ManyToOne(() => SurveyEntity, (survey) => survey.questions)
    @JoinColumn({ name: 'survey_uuid' })
    survey: SurveyEntity;

    @OneToMany(() => SurveyOptionEntity, (opt) => opt.question, { eager: true })
    options: SurveyOptionEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}