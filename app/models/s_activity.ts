import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm'
import Workout from './workout.js'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'

export default class SActivity extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare caloriesburn: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Workout)
  declare workout: HasMany<typeof Workout>

  @column()
  declare w_activity_id: number

  @belongsTo(() => SActivity)
  declare s_activity: BelongsTo<typeof SActivity>
}