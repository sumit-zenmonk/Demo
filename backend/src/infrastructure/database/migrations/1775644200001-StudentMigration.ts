import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class StudentMigration1775644200001 implements MigrationInterface {
    name = "StudentMigration1775644200001";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "public"."student_role_enum" AS ENUM('student')`
        );

        await queryRunner.createTable(
            new Table({
                name: "student",
                columns: [
                    { name: "uuid", type: "uuid", isPrimary: true, default: "uuid_generate_v4()" },
                    { name: "name", type: "varchar" },
                    { name: "email", type: "varchar", isUnique: true },
                    { name: "card_uuid", type: "varchar" },
                    { name: "program", type: "varchar" },
                    { name: "role", type: "student_role_enum", default: `'student'` },
                    { name: "created_at", type: "timestamp", default: "now()" },
                    { name: "updated_at", type: "timestamp", default: "now()" },
                    { name: "deleted_at", type: "timestamp", isNullable: true }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("student");
        await queryRunner.query(`DROP TYPE "public"."student_role_enum"`);
    }
}