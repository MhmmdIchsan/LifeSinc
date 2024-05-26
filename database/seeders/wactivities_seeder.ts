import { BaseSeeder } from "@adonisjs/lucid/seeders"
import WActivity from "../../app/models/w_activity.js"
import WActivities from "../../app/Enums/WActivities.js"

export default class extends BaseSeeder {
    async run() {
        await WActivity.createMany([
            {
                id: WActivities.YOGA,
                name: 'YOGA',
                caloriesburn: '100',
            },
            {
                id: WActivities.PUSHUP,
                name: 'PUSHUP',
                caloriesburn: '50',
            },
            {
                id: WActivities.PULLUP,
                name: 'PULLUP',
                caloriesburn: '75',
            },
            {
                id: WActivities.SQUAT,
                name: 'SQUAT',
                caloriesburn: '200',
            }
        ])
    }
}