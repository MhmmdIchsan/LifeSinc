import { DateTime } from 'luxon'
import User from './user.js'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class Tracking extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column.date()
  declare date: DateTime

  @column()
  declare workout: string

  @column()
  declare calories: string

  @column()
  declare steps: string

  @column()
  declare status: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare role_id: number

  @hasMany(() => User)
  declare user: HasMany<typeof User>

  @belongsTo(() => User)
  declare users: BelongsTo<typeof User>
}