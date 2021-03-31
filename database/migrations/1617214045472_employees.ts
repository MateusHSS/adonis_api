import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Employees extends BaseSchema {
  protected tableName = "employees"

  public async up (): Promise<void> {
  	this.schema.createTable(this.tableName, (table) => {
  		table.increments("id");
  		table.string("code").unique();
  		table.string("name");
  		table.timestamps(true, true);
  	});
  }

  public async down (): Promise<void> {
  	this.schema.dropTable(this.tableName);
  }
}
