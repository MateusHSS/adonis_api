import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Client from "./Client";

export default class Contact extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public telephone: string;

  @column()
  public cell: string;

  @column()
  public email: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Client, {
  	foreignKey: "contact_id",
  })
  public client: BelongsTo<typeof Client>;
}
