import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Services extends BaseSchema {
  protected tableName = "services"

  public async up (): Promise<void> {
  	this.schema.createTable(this.tableName, (table) => {
  		table.increments("id");
  		table.string("title");
  		table.string("description");
  		table.string("slug").unique();
  		table.timestamps(true, true);
  	});
  }

  public async down (): Promise<void> {
  	this.schema.dropTable(this.tableName);
  }
}
