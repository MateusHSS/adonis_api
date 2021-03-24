import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import Client from "./Client";

export default class Contact extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({
  	prepare: (val: string) => val.replace(/\D/g, ""),
  	consume: (val: string) => val.replace(/^([\d]{2})([\d]{4})([\d]{4})$/, "($1)$2-$3")
  })
  public telephone: string;

  @column({
  	prepare: (val: string) => val.replace(/\D/g, ""),
  	consume: (val: string) => val.replace(/^([\d]{2})([\d]{5})([\d]{4})$/, "($1)$2-$3")
  })
  public cell: string;

  @column()
  public email: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Client, {
  	localKey: "id",
  	foreignKey: "contact_id"
  })
  public client: BelongsTo<typeof Client>;
}
