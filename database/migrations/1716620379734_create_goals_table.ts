import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'goals'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('gender').nullable()
      table.string('target').nullable()
      table.string('age').nullable()
      table.string('weight').nullable()
      table.string('height').nullable()
      table.string('calories').nullable()
      table.string('workout').nullable()
      table.string('steps').nullable()
      table.string('status').nullable()
      table.timestamp('created_at').defaultTo(this.now()).notNullable()
      table.timestamp('updated_at').defaultTo(this.now()).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}