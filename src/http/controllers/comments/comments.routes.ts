import type { FastifyInstance } from 'fastify'
import { create } from './create-comment.controller.js'
import { remove } from './delete-comment.controller.js'
import { list } from './list-comments.controller.js'
import { update } from './update-comment.controller.js'
import { verifyJWT } from '@/http/middlewares/verify-jwt.js'

export async function commentsRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: [verifyJWT] }, create)

  app.get('/', list)

  app.put('/:publicId', { onRequest: [verifyJWT] }, update)

  app.delete('/:publicId', { onRequest: [verifyJWT] }, remove)
}