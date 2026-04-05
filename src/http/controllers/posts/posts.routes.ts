import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt.js'
import { create } from './create-post.controller.js'
import { deletePostController } from './delete-post.controller.js'
import { get } from './get-posts.controller.js'
import { list } from './list-posts.controller.js'
import { listPostsByUserController } from './list-posts-by-user.controller.js'
import { updatePostController } from './update-post.controller.js'

export async function postRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: [verifyJWT] }, create)
  app.get('/', list)
  app.get('/:publicId', get)
  app.patch('/:postId', { onRequest: [verifyJWT] }, updatePostController)
  app.delete('/:postId', { onRequest: [verifyJWT] }, deletePostController)
  app.get('/user/:userPublicId', listPostsByUserController)
}
