import { BaseSeeder } from "@adonisjs/lucid/seeders"
import Time from "../../app/models/time.js"
import Times from "../../app/Enums/Time.js"

export default class extends BaseSeeder {
    async run() {
        await Time.createMany([
            {
                id: Times.MORNING,
                name: 'Morning',
            },
            {
                id: Times.AFTERNOON,
                name: 'Afternoon',
            },
            {
                id: Times.NIGHT,
                name: 'Night',
            },
        ])
    }
}