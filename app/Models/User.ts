import Hash from "@ioc:Adonis/Core/Hash";
import { BaseModel, beforeSave, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public username: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  private password: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPass(user: User): Promise<void>{
  	if(user.$dirty.password)
  	  user.password = await Hash.make(user.password);
  }
}
