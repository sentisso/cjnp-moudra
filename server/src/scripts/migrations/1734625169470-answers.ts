import { MigrationInterface, QueryRunner } from 'typeorm';

export class Answers1734625169470 implements MigrationInterface {
	name = 'Answers1734625169470';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "answer" ("id" SERIAL NOT NULL, "answer" character varying NOT NULL, "secret" character varying NOT NULL, "answeredAt" TIMESTAMP, CONSTRAINT "UQ_46bd9416793bdf2d3c150c81693" UNIQUE ("answer", "secret"), CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "answer"`);
	}
}
