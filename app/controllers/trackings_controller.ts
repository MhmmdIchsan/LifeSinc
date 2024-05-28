import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Calory from '#models/calory'
import Food from '#models/food'
import Meal from '#models/meal'
import w_activity from '#models/w_activity'
import s_activity from '#models/s_activity'
import Step from '#models/step'
import Goals from '#models/goal'
import Workout from '#models/workout'
import Time from '#models/time'
import Tracking from '#models/tracking'
import { DateTime } from 'luxon'

export default class TrackingsController {
  
  async make ({ view }: HttpContext) {
    return view.render('tracking/make')
  }

  public async update({ request, response, auth }: HttpContext) {
    const { gender, target, age, weight, height } = request.all();
    const user = auth.user as User;

    const calculateBMR = (gender: string, weight: number, height: number, age: number): number => {
        if (gender === 'male') {
            return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
            return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }
    };

    const calculateCalories = (bmr: number, target: string): number => {
        let factor: number;
        switch (target) {
            case 'diet':
                factor = 1.2;
                break;
            case 'normal':
                factor = 1.375;
                break;
            case 'bulking':
                factor = 1.55;
                break;
            default:
                factor = 1.375;
        }
        return bmr * factor;
    };

    const minimumWorkout = (target: string): number => {
        switch (target) {
            case 'diet':
                return 30; // 30 minutes minimum for weight loss
            case 'normal':
                return 45; // 45 minutes for maintenance
            case 'bulking':
                return 60; // 60 minutes for muscle gain
            default:
                return 45;
        }
    };

    const minimumSteps = (): number => 10000; // 10,000 steps as a general minimum

    const calculateBMI = (weight: number, height: number): number => {
        const heightInMeters = height / 100; // Convert height from cm to meters
        return weight / (heightInMeters * heightInMeters);
    };

    const determineHealthStatus = (bmi: number): string => {
        if (bmi < 18.5) {
            return 'Underweight';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            return 'Normal';
        } else if (bmi >= 25 && bmi < 29.9) {
            return 'Overweight';
        } else {
            return 'Obese';
        }
    };

    // Calculate BMR
    const bmr = calculateBMR(gender, weight, height, age);
    const calories = calculateCalories(bmr, target);
    const workout = minimumWorkout(target);
    const steps = minimumSteps();

    // Calculate BMI and determine health status
    const bmi = calculateBMI(weight, height);
    const healthStatus = determineHealthStatus(bmi);

    // Update goals with calculated values
    const goals = new Goals();
    goals.id = user.id;
    goals.gender = gender;
    goals.target = target;
    goals.age = age;
    goals.weight = weight;
    goals.height = height;
    goals.calories = calories.toFixed(0); // rounded to the nearest integer
    goals.workout = workout.toString(); // as a string
    goals.steps = steps.toString(); // as a string
    goals.status = healthStatus;
    await goals.save();

    await User.query().where('id', user.id).update({ tracking: user.id });

    return response.redirect().toRoute('track.show');
  }

  async show({ view, auth }: HttpContext) {
    const user = auth.user as User
    const goals = await Goals.query().where('id', user.id).first()

    const tracking = await Tracking.query().where('user_id', user.id).first()
    const caloriesQuery = await Tracking.query().where('user_id', user.id).whereNotNull('calories').exec();
    const workoutQuery = await Tracking.query().where('user_id', user.id).whereNotNull('workout').exec();
    const stepsQuery = await Tracking.query().where('user_id', user.id).whereNotNull('steps').exec();

    // Convert query results to JSON manually
    const calories = caloriesQuery.map(entry => entry.toJSON());
    const workout = workoutQuery.map(entry => entry.toJSON());
    const steps = stepsQuery.map(entry => entry.toJSON());

    // Render the view with data
    return view.render('tracking/show', { calories: JSON.stringify(calories), workout: JSON.stringify(workout), steps: JSON.stringify(steps), tracking, goals });
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
    const { sactivities_id, time, duration, totalSteps } = request.all()
    const user = auth.user as User

    const step = new Step()
    step.userId = user.id
    step.activities = sactivities_id
    step.timeId = time
    step.duration = duration
    step.caloriesburn = totalSteps
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

  async adminShow({ view }: HttpContext) {
    return view.render('admin/dashboard')
  }

  async adminUsers({ view }: HttpContext) {
    const users = await User.query().orderBy('id').exec();

    return view.render('admin/users', { users })
  }

  async adminDelete({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    await user?.delete()

    return response.redirect().toRoute('admin.users')
  }

  async adminEdit({ view, params }: HttpContext) {
    const user = await User.find(params.id)

    return view.render('admin/edit', { user })
  }

  async adminUpdate({ request, response, params }: HttpContext) {
    const user = await User.find(params.id)
    const requestData = request.only(['username', 'fullname', 'email', 'password', 'roleId'])
    user?.merge(requestData)
    await user?.save()

    return response.redirect().toRoute('admin.users')
  }

  async adminFood({ view }: HttpContext) {
    const foods = await Food.query().orderBy('id').exec()

    return view.render('admin/foods', { foods })
  }

  async adminFoodDelete({ params, response }: HttpContext) {
    const food = await Food.find(params.id)
    await food?.delete()

    return response.redirect().toRoute('admin.food')
  }

  async adminFoodEdit({ view, params }: HttpContext) {
    const food = await Food.find(params.id)

    return view.render('admin/editFood', { food })
  }

  async adminFoodUpdate({ request, response, params }: HttpContext) {
    const food = await Food.find(params.id)
    const requestData = request.only(['name', 'calories', 'protein', 'carbs', 'fat'])
    food?.merge(requestData)
    await food?.save()

    return response.redirect().toRoute('admin.food')
  }

  async adminFoodCreate({ view }: HttpContext) {
    return view.render('admin/createFood')
  }

  async adminFoodStore({ request, response }: HttpContext) {
    const { name, calories, carbs } = request.all()

    const food = new Food()
    food.name = name
    food.calories = calories
    food.carbs = carbs
    await food.save()

    return response.redirect().toRoute('admin.food')
  }
}