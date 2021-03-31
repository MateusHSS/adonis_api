import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class ServiceOrders extends BaseSchema {
  protected tableName = "service_orders"

  public async up (): Promise<void> {
  	this.schema.createTable(this.tableName, (table) => {
  		table.increments("id");
  		table.integer("employee_id").unsigned();
  		table.integer("client_id").unsigned();
  		table.string("internal_proccess").unique();
  		table.date("deadline");
  		table.string("description").nullable();
  		table.timestamps(true, true);
  	});
  }

  public async down (): Promise<void> {
  	this.schema.dropTable(this.tableName);
  }
}
