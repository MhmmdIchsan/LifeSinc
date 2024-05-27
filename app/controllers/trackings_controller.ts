import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Calory from '#models/calory'
import Food from '#models/food'
import Meal from '#models/meal'
import w_activity from '#models/w_activity'
import s_activity from '#models/s_activity'
import Step from '#models/step'
import Workout from '#models/workout'
import Time from '#models/time'
import Tracking from '#models/tracking'
import { DateTime } from 'luxon'

export default class TrackingsController {
  
  async make ({ view }: HttpContext) {
    return view.render('tracking/make')
  }

  async update({ request, response, auth }: HttpContext) {
    const { tracking } = request.all();
    // mengupdate field tracking pada table user yang sedang login
    const user = auth.user as User;

    if (user) {
      user.tracking = tracking;
      await user.save();
    }

    return response.redirect().toRoute('track.show');
  }

  async show({ view, auth }: HttpContext) {
    const user = auth.user as User
    const tracking = await Tracking.query().where('user_id', user.id).first()
    const caloriesQuery = await Tracking.query().where('user_id', user.id).whereNotNull('calories').exec();
    const workoutQuery = await Tracking.query().where('user_id', user.id).whereNotNull('workout').exec();
    const stepsQuery = await Tracking.query().where('user_id', user.id).whereNotNull('steps').exec();

    // Convert query results to JSON manually
    const calories = caloriesQuery.map(entry => entry.toJSON());
    const workout = workoutQuery.map(entry => entry.toJSON());
    const steps = stepsQuery.map(entry => entry.toJSON());

    // Render the view with data
    return view.render('tracking/show', { calories: JSON.stringify(calories), workout: JSON.stringify(workout), steps: JSON.stringify(steps), tracking });
  }

  async caloriesShow({ view, auth }: HttpContext) {
    const user = auth.user as User;
    
    const calories = await Calory.query()
      .where('user_id', user.id)
      .whereRaw('DATE(date) = CURDATE()')
      .preload('food')
      .preload('meal')

    return view.render('tracking/showCalories', { calories });
  }

  async caloriesAdd({ view }: HttpContext) {
    const foods = await Food.all()
    const meals = await Meal.all()

    return view.render('tracking/addCalories', { foods, meals });
  }

  async caloriesStore({ request, response, auth }: HttpContext) {
    const { food_id, meal, calories } = request.all()
    const user = auth.user as User

    const calory = new Calory()
    calory.userId = user.id
    calory.foodsId = food_id
    calory.mealId = meal
    calory.amount = calories
    calory.date = DateTime.local().setZone('Asia/Jakarta')
    await calory.save()

    return response.redirect().toRoute('track.calories');
  }

  async caloriesDelete({ params, response }: HttpContext) {
    const calory = await Calory.find(params.id)
    await calory?.delete()

    return response.redirect().toRoute('track.calories');
  }

  async workoutShow({ view, auth }: HttpContext) {
    const user = auth.user as User;
    const workouts = await Workout.query()
      .where('user_id', user.id)
      .whereRaw('DATE(date) = CURDATE()')
      .preload('activity')
      .preload('time')

    return view.render('tracking/showWorkout', { workouts });
  }

  async workoutAdd({ view }: HttpContext) {
    const wactivities = await w_activity.all()
    const times = await Time.all()

    return view.render('tracking/addWorkout', { times, wactivities })
  }

  async workoutStore({ request, response, auth }: HttpContext) {
    const { wactivities_id, time, duration, totalCaloriesBurned} = request.all()
    const user = auth.user as User

    const workout = new Workout()
    workout.userId = user.id
    workout.activities = wactivities_id
    workout.timeId = time
    workout.duration = duration
    workout.caloriesburn = totalCaloriesBurned
    workout.date = DateTime.local().setZone('Asia/Jakarta')
    await workout.save()

    return response.redirect().toRoute('track.workout');
  }

  async workoutDelete({ params, response }: HttpContext) {
    const workout = await Workout.find(params.id)
    await workout?.delete()

    return response.redirect().toRoute('track.workout');
  }

  async stepShow({ view, auth }: HttpContext) {
    const user = auth.user as User
    const steps = await Step.query()
      .where('userId', user.id)
      .whereRaw('DATE(date) = CURDATE()')
      .preload('activity')
      .preload('time')

    return view.render('tracking/showStep', { steps })
  }

  async stepAdd({ view }: HttpContext) {
    const sactivities = await s_activity.all()
    const times = await Time.all()

    return view.render('tracking/addStep', { times, sactivities })
  }

  async stepStore({ request, auth, response }: HttpContext) {
    const { sactivities_id, time, duration, totalCaloriesBurned } = request.all()
    const user = auth.user as User

    const step = new Step()
    step.userId = user.id
    step.activities = sactivities_id
    step.timeId = time
    step.duration = duration
    step.caloriesburn = totalCaloriesBurned
    step.date = DateTime.local().setZone('Asia/Jakarta')
    await step.save()

    return response.redirect().toRoute('track.step');
  }

  async stepDelete({ params, response }: HttpContext) {
    const step = await Step.find(params.id)
    await step?.delete()

    return response.redirect().toRoute('track.step');
  }

  async getCalories({ response, auth }: HttpContext) {
    try {
      const user = auth.user as User
      const calories = await Tracking.query().where('user_id', user.id).whereNotNull('calories').exec()
      return response.json(calories)
    } catch (error) {
      console.error('Error while fetching calories', error)
      return response.json(error)
    }
  }

  async getWorkout({ response, auth }: HttpContext) {
    try {
      const user = auth.user as User
      const workout = await Tracking.query().where('user_id', user.id).whereNotNull('workout').exec()
      return response.json(workout)
    } catch (error) {
      console.error('Error while fetching workout', error)
      return response.json(error)
    }
  }

  async getStep({ response, auth }: HttpContext) {
    try {
      const user = auth.user as User
      const steps = await Tracking.query().where('user_id', user.id).whereNotNull('steps').exec()
      return response.json(steps)
    } catch (error) {
      console.error('Error while fetching steps', error)
      return response.json(error)
    }
  }
}