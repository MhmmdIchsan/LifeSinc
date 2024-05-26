import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Workout from './workout.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class WActivity extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare caloriesburn : string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Workout)
  declare workout: HasMany<typeof Workout>

  @column()
  declare w_activity_id: number

  @belongsTo(() => WActivity)
  declare w_activity: BelongsTo<typeof WActivity>
}