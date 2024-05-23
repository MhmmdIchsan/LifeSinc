import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '../../app/models/role.js'
import Roles from '../../app/Enums/Roles.js'

export default class extends BaseSeeder {
  async run() {
    await Role.createMany([
      {
        id: Roles.USER,
        name: 'User',
      },
      {
        id: Roles.ADMIN,
        name: 'Admin',
      },
    ])
  }
}