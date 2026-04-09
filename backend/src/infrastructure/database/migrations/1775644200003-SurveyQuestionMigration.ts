import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class SurveyQuestionMigration1775644200003 implements MigrationInterface {
    name = "SurveyQuestionMigration1775644200003";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "public"."survey_question_question_type_enum" AS ENUM('rating', 'input', 'mcq')`
        );

        await queryRunner.createTable(
            new Table({
                name: "survey_question",
                columns: [
                    { name: "uuid", type: "uuid", isPrimary: true, default: "uuid_generate_v4()" },
                    { name: "survey_uuid", type: "uuid" },
                    { name: "question", type: "varchar" },
                    { name: "mandatory", type: "boolean", default: "false" },
                    { name: "question_type", type: "survey_question_question_type_enum", default: `'input'` },
                    { name: "created_at", type: "timestamp", default: "now()" },
                    { name: "updated_at", type: "timestamp", default: "now()" },
                    { name: "deleted_at", type: "timestamp", isNullable: true }
                ]
            })
        );

        await queryRunner.createForeignKey(
            "survey_question",
            new TableForeignKey({
                columnNames: ["survey_uuid"],
                referencedTableName: "survey",
                referencedColumnNames: ["uuid"]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("survey_question");
        await queryRunner.query(`DROP TYPE "public"."survey_question_question_type_enum"`);
    }
}