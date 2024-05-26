import { BaseSeeder } from "@adonisjs/lucid/seeders"
import Food from "../../app/models/food.js"

export default class extends BaseSeeder {
    async run() {
        await Food.createMany([
            {
                name: 'Apple',
                carbs: '25',
                calories: '95',
            },
            {
                name: 'Banana',
                carbs: '27',
                calories: '105',
            },
            {
                name: 'Orange',
                carbs: '23',
                calories: '62',
            },
            {
                name: 'Grapes',
                carbs: '27',
                calories: '69',
            }
        ])
    }
}