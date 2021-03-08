import { DateTime } from "luxon";
import { BaseModel, belongsTo, column, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import Client from "./Client";

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public zip_code: string;

  @column()
  public street: string;

  @column()
  public number: number;

  @column()
  public district: string;

  @column()
  public city: string;

  @column()
  public state: string;

  @column()
  public country: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Client, {
  	localKey: "id",
  	foreignKey: "address_id",
  })
  client: BelongsTo<typeof Client>
}
