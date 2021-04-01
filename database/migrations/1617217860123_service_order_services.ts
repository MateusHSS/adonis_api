import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class ServiceOrderServices extends BaseSchema {
  protected tableName = "service_order_services"

  public async up (): Promise<void> {
  	this.schema.createTable(this.tableName, (table) => {
  		table.increments("id");
  		table.integer("service_id").unsigned();
  		table.integer("service_order_id").unsigned();
  		table.string("service_description").nullable();
  		table.timestamps(true, true);
  	});
  }

  public async down (): Promise<void> {
  	this.schema.dropTable(this.tableName);
  }
}
