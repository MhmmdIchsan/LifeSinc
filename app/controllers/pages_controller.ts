import type { HttpContext } from '@adonisjs/core/http'

export default class PagesController {
  
  async home({ view }: HttpContext) {
    return view.render('pages/home')
  }

  async about({ view }: HttpContext) {
    return view.render('pages/about')
  }

  async contact({ view }: HttpContext) {
    return view.render('pages/contact')
  }
}