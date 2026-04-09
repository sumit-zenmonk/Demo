import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class StudentResponseEntryMigration1775644200006 implements MigrationInterface {
    name = "StudentResponseEntryMigration1775644200006";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "student_response_entry",
                columns: [
                    { name: "uuid", type: "uuid", isPrimary: true, default: "uuid_generate_v4()" },
                    { name: "response_uuid", type: "uuid" },
                    { name: "question_uuid", type: "uuid" },
                    { name: "answer", type: "varchar" },
                    { name: "created_at", type: "timestamp", default: "now()" },
                    { name: "updated_at", type: "timestamp", default: "now()" },
                    { name: "deleted_at", type: "timestamp", isNullable: true }
                ]
            })
        );

        await queryRunner.createForeignKey(
            "student_response_entry",
            new TableForeignKey({
                columnNames: ["response_uuid"],
                referencedTableName: "student_response",
                referencedColumnNames: ["uuid"]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("student_response_entry");
    }
}