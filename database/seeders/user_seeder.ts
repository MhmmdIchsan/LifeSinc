import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '../../app/models/user.js'

export default class extends BaseSeeder {
    async run() {
        await User.createMany([
        {
            fullname: 'admin',
            email: 'admin@gmail.com',
            password: '12345678',
        }
        ])
    }
}