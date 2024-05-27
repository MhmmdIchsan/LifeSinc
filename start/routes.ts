/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const PagesController = () => import('#controllers/pages_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const TrackingController = () => import('#controllers/trackings_controller')

router.get('/', async (ctx) => {
    await ctx.auth.check()
    return ctx.view.render('pages/home')
})
router.get('/home', [PagesController, 'home'])

router.group(() => {
    router.get('/register', [RegisterController, 'show']).as('register.show').use(middleware.guest())
    router.post('/register', [RegisterController, 'store']).as('register.store').use(middleware.guest())
    router.get('/login', [LoginController, 'show']).as('login.show').use(middleware.guest())
    router.post('/login', [LoginController, 'store']).as('login.store').use(middleware.guest())

    router.get('/logout', [LogoutController, 'handle']).as('logout').use(middleware.auth())
}).prefix('/auth').as('auth')

router.group(() => {
    router.get('/', async (ctx) => {
        return `You Are Here, ${ctx.auth.user?.fullname}' as ${ctx.auth.user?.roleId} role!`
    })
    .as('index')
}
).prefix('/admin').as('admin').use(middleware.admin())

router.get('/track', [TrackingController, 'make']).as('track.new').use(middleware.auth())
router.post('/track', [TrackingController, 'update']).as('track.update').use(middleware.auth())
router.get('/track/show', [TrackingController, 'show']).as('track.show').use(middleware.auth())

router.get('/track/calories', [TrackingController, 'caloriesShow']).as('track.calories').use(middleware.auth())
router.get('/track/calories/add', [TrackingController, 'caloriesAdd']).as('track.calories.add').use(middleware.auth())
router.post('/track/calories/add', [TrackingController, 'caloriesStore']).as('track.calories.store').use(middleware.auth())
router.post('/track/calories/delete/:id', [TrackingController, 'caloriesDelete']).as('track.calories.delete').use(middleware.auth())

router.get('/track/workout', [TrackingController, 'workoutShow']).as('track.workout').use(middleware.auth())
router.get('/track/workout/add', [TrackingController, 'workoutAdd']).as('track.workout.add').use(middleware.auth())
router.post('/track/workout/add', [TrackingController, 'workoutStore']).as('track.workout.store').use(middleware.auth())
router.post('/track/workout/delete/:id', [TrackingController, 'workoutDelete']).as('track.workout.delete').use(middleware.auth())

router.get('/track/step', [TrackingController, 'stepShow']).as('track.step').use(middleware.auth())
router.get('/track/step/add', [TrackingController, 'stepAdd']).as('track.step.add').use(middleware.auth())
router.post('/track/step/add', [TrackingController, 'stepStore']).as('track.step.store').use(middleware.auth())
router.post('/track/step/delete/:id', [TrackingController, 'stepDelete']).as('track.step.delete').use(middleware.auth())

router.get('/get-calories', [TrackingController, 'getCalories']).as('get.calories').use(middleware.auth())
router.get('/get-workout', [TrackingController, 'getWorkout']).as('get.workout').use(middleware.auth())
router.get('/get-steps', [TrackingController, 'getStep']).as('get.step').use(middleware.auth())