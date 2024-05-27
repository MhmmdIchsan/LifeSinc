import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'workouts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').notNullable()
      table.integer('activities').unsigned().references('w_activities.id').nullable()
      table.integer('time_id').unsigned().references('times.id').notNullable()
      table.time('duration')
      table.integer('caloriesburn')
      table.date('date').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}