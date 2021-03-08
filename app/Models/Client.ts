import { DateTime } from "luxon";
import { BaseModel, column, hasOne, HasOne } from "@ioc:Adonis/Lucid/Orm";
import Contact from "./Contact";
import Address from "./Address";

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string;

  @column()
  public cpf: string;

  @column()
  public contact_id: number;

  @column()
  public address_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Contact, {
  	localKey: "contact_id",
  	foreignKey: "id"
  })
  public contact: HasOne<typeof Contact>;

  @hasOne(() => Address, {
  	localKey: "address_id",
  	foreignKey: "id",
  })
  public address: HasOne<typeof Address>;
}
