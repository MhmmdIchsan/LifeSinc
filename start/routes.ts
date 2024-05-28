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

router.get('/calculator', async ({view}) => {
    return view.render('calculator/calculator')
}).use(middleware.auth())

router.get('/massaTubuh', async ({view}) => {
    return view.render('calculator/massaTubuh')
}).use(middleware.auth())
router.get('/kaloriHarian', async ({view}) => {
    return view.render('calculator/kaloriHarian')
}).use(middleware.auth())
router.get('/karbohidratHarian', async ({view}) => {
    return view.render('calculator/karbohidratHarian')
}).use(middleware.auth())

router.get('/admin/dashboard', [TrackingController, 'adminShow']).as('admin.dashboard').use(middleware.auth())
router.get('/admin/dashboard/users', [TrackingController, 'adminUsers']).as('admin.users').use(middleware.auth())
router.post('/admin/dashboard/users/delete/:id', [TrackingController, 'adminDelete']).as('users.delete').use(middleware.auth())
router.get('/admin/dashboard/users/delete/:id', [TrackingController, 'adminEdit']).as('users.edit').use(middleware.auth())
router.post('/admin/dashboard/users/edit/:id', [TrackingController, 'adminUpdate']).as('users.update').use(middleware.auth())

router.get('/admin/dashboard/food', [TrackingController, 'adminFood']).as('admin.food').use(middleware.auth())
router.get('/admin/dashboard/food/add', [TrackingController, 'adminFoodCreate']).as('foods.add').use(middleware.auth())
router.post('/admin/dashboard/food/add', [TrackingController, 'adminFoodStore']).as('foods.store').use(middleware.auth())
router.post('/admin/dashboard/food/delete/:id', [TrackingController, 'adminFoodDelete']).as('foods.delete').use(middleware.auth())
router.get('/admin/dashboard/food/edit/:id', [TrackingController, 'adminFoodEdit']).as('foods.edit').use(middleware.auth())
router.post('/admin/dashboard/food/edit/:id', [TrackingController, 'adminFoodUpdate']).as('foods.update').use(middleware.auth())
