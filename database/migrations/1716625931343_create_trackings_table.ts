import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'trackings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.increments('user_id').unsigned().references('users.id').notNullable()
      table.date('date').notNullable()
      table.string('workout').notNullable()
      table.string('calories').notNullable()
      table.string('steps').notNullable()
      table.string('status').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}