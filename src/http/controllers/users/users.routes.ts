import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt.js'
import { listPostsByUserController } from '../posts/list-posts-by-user.controller.js'
import { authenticate } from './authenticate.controller.js'
import { deleteUserController } from './delete-user.controller.js'
import { get } from './get-user.controller.js'
import { list } from './list-users.controller.js'
import { register } from './register.controller.js'
import { updateProfileController } from './update-user.controller.js'

export async function userRoutes(app: FastifyInstance) {
  app.post('/', register)

  app.get('/:publicId', get)

  app.get('/', list)

  app.delete('/me', { onRequest: [verifyJWT] }, deleteUserController)
  app.patch('/me', { onRequest: [verifyJWT] }, updateProfileController)

  app.get('/:publicId/posts', listPostsByUserController)

  app.post('/authenticate', authenticate)
}
