import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Contacts extends BaseSchema {
  protected tableName = "contacts"

  public async up (): Promise<void> {
  	this.schema.createTable(this.tableName, (table) => {
  		table.increments("id");
  		table.string("telephone");
  		table.string("cell");
  		table.string("email");
  		table.timestamps(true, true);
  	});
  }

  public async down (): Promise<void> {
  	this.schema.dropTable(this.tableName);
  }
}
