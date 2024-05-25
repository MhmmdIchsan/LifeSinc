import { BaseSchema } from '@adonisjs/lucid/schema'
import Roles from '../../app/Enums/Roles.js'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('role_id').unsigned().references('roles.id').notNullable().defaultTo(Roles.USER)
      table.string('fullname').nullable()
      table.integer('tracking').unsigned().references('goals.id').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('remember_me_token').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}