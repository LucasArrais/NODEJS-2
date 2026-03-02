import type {FastifyInstance} from 'fastify'
import {register} from './register.controller.js'
import { get } from './get-user.controller.js'
import { list } from './list-users.controller.js'
import { update } from './update-user.controller.js'
import { listPostsByUserController } from '../posts/list-posts-by-user.controller.js'
import { authenticate } from './authenticate.controller.js'
import { verifyJWT } from '@/http/middlewares/verify-jwt.js'
import { verifyUserRole } from '@/http/middlewares/verify-user-role.js'
import { deleteUser } from './delete-user.controller.js'

export async function userRoutes(app: FastifyInstance) {
    app.post('/', register)

    app.get('/:publicId', get)

    app.get(
  '/',
  { onRequest: [verifyJWT, verifyUserRole(['ADMIN'])] },
  list
    )  

    app.delete('/:publicId', { onRequest: [verifyJWT] }, deleteUser)
    app.patch('/:publicId', { onRequest: [verifyJWT] }, update)

    app.get('/:publicId/posts', listPostsByUserController)

    app.post('/authenticate', authenticate)
    
}