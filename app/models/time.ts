import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Workout from './workout.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class Time extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare time_id: number

  @hasMany(() => Workout)
  declare workout: HasMany<typeof Workout>

  @belongsTo(() => Time)
  declare time: BelongsTo<typeof Time>
}