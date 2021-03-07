import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class ApiTokens extends BaseSchema {
  protected tableName = "api_tokens"

  public async up (): Promise<void> {
  	this.schema.createTable(this.tableName, (table) => {
  		table.increments("id").primary();
  		table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
  		table.string("name").notNullable();
  		table.string("type").notNullable();
  		table.string("token", 64).notNullable();

  		/**
       * "useTz: true" utilizes timezone option in PostgreSQL and MSSQL
       */
  		table.timestamp("expires_at", { useTz: true }).nullable();
  		table.timestamps(true, true);
  	});
  }

  public async down (): Promise<void>{
  	this.schema.dropTable(this.tableName);
  }
}