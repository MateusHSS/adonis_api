import { DateTime } from "luxon";
import { afterSave, BaseModel, column, hasMany, HasMany } from "@ioc:Adonis/Lucid/Orm";
import ServiceOrder from "./ServiceOrder";

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public code: string

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relations =========================================== //

  @hasMany(() => ServiceOrder, {
  	localKey: "id",
  	foreignKey: "employee_id"
  })
  public service_orders: HasMany<typeof ServiceOrder>

  // Hooks =============================================== //

  @afterSave()
  public static set_employee_code(employee: Employee): void {
  	employee.code = "F"+String(employee.id).padStart(4, "0");
  }
}
