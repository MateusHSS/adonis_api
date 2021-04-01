import { BaseModel, beforeSave, column, computed } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
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

  @computed()
  public get service_description(): string{
  	return this.$extras.pivot_service_description;
  }

  // Relations ================================== //

  

  // Hooks ==================================== //

  @beforeSave()
  public static generateSlug(service: Service): void {
  	service.slug = slugify(service.title, { replacement: "_", lower: true, locale: "pt-BR" });
  }
}
