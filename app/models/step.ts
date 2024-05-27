import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import s_activity from '#models/s_activity'
import Time from '#models/time'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Step extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare activities: number

  @belongsTo(() => s_activity, {
    foreignKey: 'activities',
  })
  declare activity: BelongsTo<typeof s_activity>

  @column()
  declare timeId: number

  @belongsTo(() => Time, {
    foreignKey: 'timeId',
  })
  declare time: BelongsTo<typeof Time>

  @column()
  declare duration: string

  @column()
  declare caloriesburn: number

  @column.date()
  declare date: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}