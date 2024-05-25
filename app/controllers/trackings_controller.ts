import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

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
    const user = auth.user as User;
    return view.render('tracking/show', { tracking: user.tracking });
  }
  
}