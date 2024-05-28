import { DateTime } from 'luxon'
import User from './user.js'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class Goal extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare gender: string

  @column()
  declare target: string

  @column()
  declare age: string

  @column()
  declare weight: string

  @column()
  declare height: string

  @column()
  declare calories: string

  @column()
  declare workout: string

  @column()
  declare steps: string

  @column()
  declare status: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => User)
  declare users: HasMany<typeof User>

  @column()
  declare tracking: number

  @belongsTo(() => Goal)
  declare goal: BelongsTo<typeof Goal>
}