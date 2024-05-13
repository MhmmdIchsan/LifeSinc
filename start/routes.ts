/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const PagesController = () => import('#controllers/pages_controller')
const AuthController = () => import('#controllers/auth_controller')

router.on('/').render('pages/home')
router.get('/home', [PagesController, 'home'])
router.get('/about', [PagesController, 'about'])
router.get('/register', [AuthController, 'register'])