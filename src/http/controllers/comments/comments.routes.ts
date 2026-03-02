import type { FastifyInstance } from 'fastify'
import { create } from './create-comment.controller.js'
import { remove } from './delete-comment.controller.js'
import { list } from './list-comments.controller.js'
import { update } from './update-comment.controller.js'
import { verifyJWT } from '@/http/middlewares/verify-jwt.js'
import { listCommentsByPostController } from './list-comments-by-post.controller.js'
import { listCommentsByUserController } from './list-comments-by-user.js'
import { getCommentController } from './get-comment.controller.js'

export async function commentsRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: [verifyJWT] }, create)

  app.get('/', list)

  app.put('/:publicId', { onRequest: [verifyJWT] }, update)

  app.delete('/:publicId', { onRequest: [verifyJWT] }, remove)

  app.get('/post/:postPublicId', listCommentsByPostController)

  app.get('/user/:userPublicId', listCommentsByUserController)

  app.get('/:commentPublicId', getCommentController)
}