import { DateTime } from "luxon";
import { BaseModel, beforeSave, column } from "@ioc:Adonis/Lucid/Orm";
import slugify from "slugify";

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string;

  @column()
  public description: string;

  @column()
  public slug: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static generateSlug(service: Service): void {
  	service.slug = slugify(service.title, { replacement: "_", lower: true, locale: "pt-BR" });
  }
}
