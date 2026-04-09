import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StudentRoleNum } from "../../enums/university.enum";
import { StudentResponseEntity } from "./response.entity";

@Entity('student')
export class StudentEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    card_uuid: string;

    @Column()
    program: string;

    @Column({
        type: 'enum',
        enum: StudentRoleNum,
        default: StudentRoleNum.STUDENT,
    })
    role: StudentRoleNum;

    @OneToMany(() => StudentResponseEntity, (response) => response.student)
    responses: StudentResponseEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}