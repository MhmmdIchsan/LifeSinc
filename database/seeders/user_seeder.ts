import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '../../app/models/user.js'

export default class extends BaseSeeder {
    async run() {
        await User.createMany([
        {
            fullname: 'admin',
            roleId: 2,
            email: 'admin@gmail.com',
            password: '12345678',
        },
        {
            fullname: 'user',
            roleId: 1,
            email: 'tes@gmail.com',
            password: '12345678',
        }
        ])
    }
}