import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrders1792749861809 implements MigrationInterface {
    name = 'CreateOrders1792749861809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "customer_email" character varying NOT NULL, "product_name" character varying NOT NULL, "quantity" integer NOT NULL, "status" character varying(20) NOT NULL DEFAULT 'PENDING', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
