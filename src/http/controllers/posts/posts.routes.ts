import type { FastifyInstance } from 'fastify'
import { create } from './create-post.controller.js'
import { list } from './list-posts.controller.js'
import { get } from './get-posts.controller.js'
import { update } from './update-post.controller.js'
import { remove } from './delete-post.controller.js'
import { verifyJWT } from '@/http/middlewares/verify-jwt.js'

export async function postRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: [verifyJWT] }, create)
  app.get('/', list)
  app.get('/:publicId', get)
  app.patch('/:publicId', { onRequest: [verifyJWT] }, update)
  app.delete('/:publicId', { onRequest: [verifyJWT] }, remove)
}