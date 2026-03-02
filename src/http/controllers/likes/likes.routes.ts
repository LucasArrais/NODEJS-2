import type { FastifyInstance } from 'fastify'
import { createLikeController } from './create-like.controller.js'
import { verifyJWT } from '@/http/middlewares/verify-jwt.js'
import { deleteLikeController } from './delete-like.controller.js'
import { listLikesByPostController } from './list-likes-by-post.controller.js'
import { listLikesByCommentController } from './list-likes-by-comment.controller.js'
import { listLikesByUserController } from './list-likes-by-user.controller.js'
import { getLikeController } from './get-like.controller.js'

export async function likesRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: [verifyJWT] }, createLikeController)
  
  app.delete('/', { onRequest: [verifyJWT] }, deleteLikeController)

  app.get('/post/:postPublicId', listLikesByPostController)

  app.get('/comment/:commentPublicId', listLikesByCommentController)

  app.get('/user/:userPublicId', listLikesByUserController)

  app.get('/:likeId', getLikeController)
  
}