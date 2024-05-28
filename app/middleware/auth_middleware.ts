import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'
import Tracking from '#models/tracking'
import Step from '#models/step'
import Workout from '#models/workout'
import Calory from '#models/calory'
import { DateTime } from 'luxon'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/auth/login'

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo })
    
    const user = ctx.auth.user

    if (user) {
      const today = DateTime.local().setZone('Asia/Jakarta').toFormat('yyyy-MM-dd')
      console.log('Today:', today)

      // Check if a tracking record exists for today
      let tracking = await Tracking.query().where('user_id', user.id).andWhereRaw('DATE(date) = ?', [today]).first()

      // If not, create a new one
      if (!tracking) {
        tracking = new Tracking()
        tracking.user_id = user.id
        tracking.date = DateTime.local().setZone('Asia/Jakarta')
      }

      // Calculate the sum of calories for today
      const caloriesSum = await Calory.query()
        .where('user_id', user.id)
        .andWhereRaw('DATE(date) = ?', [today])
        .sum('amount as total')
        .first()

      const workoutSum = await Workout.query()
        .where('user_id', user.id)
        .andWhereRaw('DATE(date) = ?', [today])
        .sum('caloriesburn as total')
        .first() 
      
      const stepSum = await Step.query()
        .where('user_id', user.id)
        .andWhereRaw('DATE(date) = ?', [today])
        .sum('caloriesburn as total')
        .first()


      // Safely access the total property from the $extras object
      const totalCalories = caloriesSum?.$extras?.total ? parseInt(caloriesSum.$extras.total, 10) : 0
      const totalWorkout = workoutSum?.$extras?.total ? parseInt(workoutSum.$extras.total, 10) : 0
      const totalStep = stepSum?.$extras?.total ? parseInt(stepSum.$extras.total, 10) : 0

      // Update the tracking record
      tracking.calories = totalCalories.toString()
      tracking.workout = totalWorkout.toString()
      tracking.steps = totalStep.toString()
      await tracking.save()
    }

    return next()
  }
}