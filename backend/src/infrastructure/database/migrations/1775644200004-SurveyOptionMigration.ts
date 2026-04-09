import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class SurveyOptionMigration1775644200004 implements MigrationInterface {
    name = "SurveyOptionMigration1775644200004";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "survey_option",
                columns: [
                    { name: "uuid", type: "uuid", isPrimary: true, default: "uuid_generate_v4()" },
                    { name: "question_uuid", type: "uuid" },
                    { name: "option", type: "varchar" },
                    { name: "created_at", type: "timestamp", default: "now()" },
                    { name: "updated_at", type: "timestamp", default: "now()" },
                    { name: "deleted_at", type: "timestamp", isNullable: true }
                ]
            })
        );

        await queryRunner.createForeignKey(
            "survey_option",
            new TableForeignKey({
                columnNames: ["question_uuid"],
                referencedTableName: "survey_question",
                referencedColumnNames: ["uuid"]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("survey_option");
    }
}