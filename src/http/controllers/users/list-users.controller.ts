import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeListUsersUseCase } from '@/usecases/factories/make-list-users.js'

export async function list(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const listUsersUseCase = makeListUsersUseCase()

    const { users } = await listUsersUseCase.execute()

    const usersHTTP = users.map(user => ({
      id: user.id,
      public_id: user.public_id,
      name: user.name,
      email: user.email,
      photo: null,
      role: 'DEFAULT'
    }))

    return reply.status(200).send(usersHTTP)
  } catch (error) {
    throw error
  }
}