import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class SurveyMigration1775644200002 implements MigrationInterface {
    name = "SurveyMigration1775644200002";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "survey",
                columns: [
                    { name: "uuid", type: "uuid", isPrimary: true, default: "uuid_generate_v4()" },
                    { name: "creator_uuid", type: "uuid" },
                    { name: "title", type: "varchar" },
                    { name: "description", type: "varchar" },
                    { name: "target_program", type: "varchar" },
                    { name: "start_date", type: "date" },
                    { name: "end_date", type: "date" },
                    { name: "created_at", type: "timestamp", default: "now()" },
                    { name: "updated_at", type: "timestamp", default: "now()" },
                    { name: "deleted_at", type: "timestamp", isNullable: true }
                ]
            })
        );

        await queryRunner.createForeignKey(
            "survey",
            new TableForeignKey({
                columnNames: ["creator_uuid"],
                referencedTableName: "university_department",
                referencedColumnNames: ["uuid"]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("survey");
    }
}