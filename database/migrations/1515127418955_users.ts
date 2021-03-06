import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Users extends BaseSchema {
  protected tableName = "users"

  public async up (): Promise<void> {
  	this.schema.createTable(this.tableName, (table) => {
  		table.increments("id");
  		table.string("username")
		  .unique()
		  .notNullable();
  		table.string("email")
		  .unique()
		  .notNullable();
  		table.string("password").notNullable();
  		table.string("remember_me_token").nullable();
  		table.timestamps(true, true);
  	});
  }

  public async down (): Promise<void> {
  	this.schema.dropTable(this.tableName);
  }
}
