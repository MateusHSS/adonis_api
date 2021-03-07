import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Addresses extends BaseSchema {
  protected tableName = "addresses"

  public async up (): Promise<void> {
  	this.schema.createTable(this.tableName, (table) => {
  		table.increments("id");
  		table.string("zip_code").nullable();
  		table.string("street").nullable();
  		table.integer("number").nullable();
  		table.string("district").nullable();
  		table.string("city").nullable();
  		table.string("state").nullable();
  		table.string("country").nullable();
  		table.timestamps(true, true);
  	});
  }

  public async down (): Promise<void> {
  	this.schema.dropTable(this.tableName);
  }
}
