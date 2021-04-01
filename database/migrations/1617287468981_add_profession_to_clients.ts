import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Clients extends BaseSchema {
  protected tableName = "clients"

  public async up (): Promise<void> {
  	this.schema.alterTable(this.tableName, (table) => {
  		table.string("profession").nullable().after("address_id");
  	});
  }

  public async down (): Promise<void> {
  	this.schema.alterTable(this.tableName, (table) => {
  		table.dropColumn("profession");
  	});
  }
}
