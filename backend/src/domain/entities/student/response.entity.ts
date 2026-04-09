import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StudentEntity } from "./student.entity";
import { StudentResponseEntry } from "./response.entry.entity";

@Entity('student_response')
export class StudentResponseEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: "uuid" })
    student_uuid: string;

    @Column({ type: "uuid" })
    survey_uuid: string;

    @ManyToOne(() => StudentEntity, (student) => student.responses)
    @JoinColumn({ name: "student_uuid" })
    student: StudentEntity;

    @OneToMany(() => StudentResponseEntry, (entry) => entry.response, { eager: true })
    entries: StudentResponseEntry[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}