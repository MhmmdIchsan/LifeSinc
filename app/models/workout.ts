import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Workout extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare activities: string

  @column()
  declare time: DateTime

  @column()
  declare duration: number

  @column()
  declare caloriesburn: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}