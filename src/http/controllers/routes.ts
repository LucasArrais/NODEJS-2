import type { FastifyInstance } from 'fastify'
import { commentsRoutes } from './comments/comments.routes.js'
import { likesRoutes } from './likes/likes.routes.js'
import { postRoutes } from './posts/posts.routes.js'
import { userRoutes } from './users/users.routes.js'

export async function appRoutes(app: FastifyInstance) {
  app.register(userRoutes, { prefix: '/users' })
  app.register(postRoutes, { prefix: '/posts' })
  app.register(commentsRoutes, { prefix: '/comments' })
  app.register(likesRoutes, { prefix: '/likes' })
}
