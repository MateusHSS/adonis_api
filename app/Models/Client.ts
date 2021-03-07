import { DateTime } from "luxon";
import { BaseModel, column, hasOne } from "@ioc:Adonis/Lucid/Orm";
import Contact from "./Contact";
import { HasOne } from "@ioc:Adonis/Lucid/Relations";
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
  	foreignKey: "contact_id",
  })
  public contact: HasOne<typeof Contact>;

  @hasOne(() => Address, {
  	foreignKey: "address_id",
  })
  public address: HasOne<typeof Address>;
}
