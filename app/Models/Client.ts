import { BaseModel, beforeDelete, beforeSave, column, hasMany, hasOne, HasOne, HasMany } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import Address from "./Address";
import Contact from "./Contact";
import ServiceOrder from "./ServiceOrder";

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string;

  @column({
  	prepare: (val: string) => val.replace(/\D/g, ""),
  	consume: (val: string) => val.replace(/^([\d]{3})([\d]{3})([\d]{3})([\d]{2})$/, "$1.$2.$3-$4")
  })
  public cpf: string;

  @column()
  public contact_id: number;

  @column()
  public address_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relations ============================= //

  @hasOne(() => Contact, {
  	localKey: "contact_id",
  	foreignKey: "id",
  })
  public contact: HasOne<typeof Contact>;

  @hasOne(() => Address, {
  	localKey: "address_id",
  	foreignKey: "id",
  })
  public address: HasOne<typeof Address>;

  @hasMany(() => ServiceOrder, {
  	foreignKey: "client_id",
  	localKey: "id"
  })
  public service_orders: HasMany<typeof ServiceOrder>

  // Hooks ==================================== //

  @beforeSave()
  public static format_cpf(client: Client): void{
  	client.cpf = client.cpf.replace(/\D/g, "");
  }

  @beforeDelete()
  public static async remove_contact(client: Client): Promise<void>{
  	const contact = await Contact.findBy("id", client.contact_id);

  	if(contact){
  		await contact.delete();
  	}

  }

  public static async remove_address(client: Client): Promise<void>{
  	const address = await Address.findBy("id", client.address_id);

  	if(address){
  		await address.delete();
  	}
  	
  }
  
}
