import { BaseSeeder } from "@adonisjs/lucid/seeders"
import Meal from "../../app/models/meal.js"
import Meals from "../../app/Enums/Meals.js"

export default class extends BaseSeeder {
    async run() {
        await Meal.createMany([
            {
                id: Meals.BREAKFAST,
                name: 'Breakfast',
            },
            {
                id: Meals.LUNCH,
                name: 'Lunch',
            },
            {
                id: Meals.DINNER,
                name: 'Dinner',
            }
        ])
    }
}