import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Food from '#models/food'
import Meal from '#models/meal'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Calory extends BaseModel {
  [x: string]: any
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare foodsId: number

  @belongsTo(() => Food, {
    foreignKey: 'foodsId',
  })
  declare food: BelongsTo<typeof Food>

  @column()
  declare mealId: number

  @belongsTo(() => Meal, {
    foreignKey: 'mealId',
  })
  declare meal: BelongsTo<typeof Meal>

  @column()
  declare amount: number

  @column.date()
  declare date: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime


}