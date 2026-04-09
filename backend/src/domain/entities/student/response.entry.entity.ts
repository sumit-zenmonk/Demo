import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StudentResponseEntity } from "./response.entity";

@Entity('student_response_entry')
export class StudentResponseEntry {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: "uuid" })
    response_uuid: string;

    @Column({ type: "uuid" })
    question_uuid: string;

    @Column()
    answer: string;

    @ManyToOne(() => StudentResponseEntity, (student) => student.entries)
    @JoinColumn({ name: "response_uuid" })
    response: StudentResponseEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}