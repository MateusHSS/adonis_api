import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Clients extends BaseSchema {
  protected tableName = "clients"

  public async up (): Promise<void> {
  	this.schema.createTable(this.tableName, (table) => {
  		table.increments("id");
  		table.string("name");
  		table.string("cpf");
  		table.integer("contact_id").unsigned();
  		table.integer("address_id").unsigned();
  		table.timestamps(true, true);

  		table.foreign("contact_id")
  			.references("id")
  			.inTable("contacts")
  			.onUpdate("cascade")
  			.onDelete("set null");

  		table.foreign("address_id")
  			.references("id")
  			.inTable("addresses")
  			.onUpdate("cascade")
  			.onDelete("set null");
  	});
  }

  public async down (): Promise<void> {
  	this.schema.dropTable(this.tableName);
  }
}
