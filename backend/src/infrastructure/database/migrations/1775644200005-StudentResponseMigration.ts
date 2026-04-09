import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class StudentResponseMigration1775644200005 implements MigrationInterface {
    name = "StudentResponseMigration1775644200005";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "student_response",
                columns: [
                    { name: "uuid", type: "uuid", isPrimary: true, default: "uuid_generate_v4()" },
                    { name: "student_uuid", type: "uuid" },
                    { name: "survey_uuid", type: "uuid" },
                    { name: "created_at", type: "timestamp", default: "now()" },
                    { name: "updated_at", type: "timestamp", default: "now()" },
                    { name: "deleted_at", type: "timestamp", isNullable: true }
                ]
            })
        );

        await queryRunner.createForeignKey(
            "student_response",
            new TableForeignKey({
                columnNames: ["student_uuid"],
                referencedTableName: "student",
                referencedColumnNames: ["uuid"]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("student_response");
    }
}