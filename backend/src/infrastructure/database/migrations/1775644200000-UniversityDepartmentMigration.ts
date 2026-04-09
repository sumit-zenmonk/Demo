import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UniversityDepartmentMigration1775644200000 implements MigrationInterface {
    name = "UniversityDepartmentMigration1775644200000";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "public"."university_department_role_enum" AS ENUM('hod', 'teacher', 'administrators')`
        );

        await queryRunner.createTable(
            new Table({
                name: "university_department",
                columns: [
                    { name: "uuid", type: "uuid", isPrimary: true, default: "uuid_generate_v4()" },
                    { name: "name", type: "varchar" },
                    { name: "email", type: "varchar", isUnique: true },
                    { name: "password", type: "varchar" },
                    { name: "role", type: "university_department_role_enum", default: `'teacher'` },
                    { name: "created_at", type: "timestamp", default: "now()" },
                    { name: "updated_at", type: "timestamp", default: "now()" },
                    { name: "deleted_at", type: "timestamp", isNullable: true }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("university_department");
        await queryRunner.query(`DROP TYPE "public"."university_department_role_enum"`);
    }
}