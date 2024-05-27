import { BaseSeeder } from "@adonisjs/lucid/seeders"
import SActivity from "../../app/models/s_activity.js"
import SActivities from "../../app/Enums/SActivities.js"

export default class extends BaseSeeder {
    async run() {
        await SActivity.createMany([
            {
                id: SActivities.WALK,
                name: 'WALK',
                caloriesburn: '100',
            },
            {
                id: SActivities.RUN,
                name: 'RUN',
                caloriesburn: '50',
            },
            {
                id: SActivities.JOG,
                name: 'JOG',
                caloriesburn: '75',
            }
        ])
    }
}