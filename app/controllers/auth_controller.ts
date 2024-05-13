import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  
  async register({ view }: HttpContext) {
    return view.render('auth/register')
  }

  async login({ view }: HttpContext) {
    return view.render('auth/login')
  }

  async forgot({ view }: HttpContext) {
    return view.render('auth/forgot')
  }

  async reset({ view }: HttpContext) {
    return view.render('auth/reset')
  }
}