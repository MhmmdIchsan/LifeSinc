import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Goal from '../../app/models/goal.js'
import Goals from '../../app/Enums/Goals.js'

export default class extends BaseSeeder {
    async run() {
        await Goal.createMany([
            {
                id: Goals.NORMAL,
                name: 'Normal',
            },
            {
                id: Goals.DIET,
                name: 'Diet',
            },
        ])
    }
}