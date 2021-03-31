import { DateTime } from "luxon";
import { BaseModel, column, hasOne, manyToMany, HasOne, ManyToMany, afterSave } from "@ioc:Adonis/Lucid/Orm";
import Service from "./Service";
import Client from "./Client";
import Employee from "./Employee";

export default class ServiceOrder extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public client_id: number

  @column()
  public employee_id: number

  @column()
  public internal_proccess: string

  @column()
  public deadline: Date

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Client, {
  	localKey: "client_id",
  	foreignKey: "id"
  })
  public client: HasOne<typeof Client>

  @hasOne(() => Employee, {
  	localKey: "employee_id",
  	foreignKey: "id"
  })
  public employee: HasOne<typeof Employee>

  @manyToMany(() => Service, {
  	pivotTable: "service_order_services",
  	localKey: "id",
  	relatedKey: "id",
  	pivotForeignKey: "service_order_id",
  	pivotRelatedForeignKey: "service_id"
  })
  public services: ManyToMany<typeof Service>

  // Hooks =============================================== //

  @afterSave()
  public static set_internal_proccess(service_order: ServiceOrder): void {
  	service_order.internal_proccess = "P"+String(service_order.id).padStart(4, "0");
  }
}
