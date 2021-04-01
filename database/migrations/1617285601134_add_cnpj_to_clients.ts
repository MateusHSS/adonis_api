import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class AddCnpjToClients extends BaseSchema {
  protected tableName = "clients"

  public async up (): Promise<void> {
  	this.schema.alterTable(this.tableName, (table) => {
  		table.enum("doc_type", ["cpf", "cnpj"]).notNullable().defaultTo("cpf").after("cpf");
  		table.renameColumn("cpf", "cpf_cnpj");
  	});
  }

  public async down (): Promise<void> {
  	this.schema.alterTable(this.tableName, (table) => {
  		table.dropColumn("doc_type");
  		table.renameColumn("cpf_cnpj", "cpf");
  	});
  }
}
