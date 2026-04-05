import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserPresenter } from '@/http/presenters/user-presenter.js'
import { makeListUsersUseCase } from '@/usecases/factories/make-list-users.js'

export async function list(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const listUsersUseCase = makeListUsersUseCase()

    const { users } = await listUsersUseCase.execute()

    return reply.status(200).send(UserPresenter.toHTTP(users))
  } catch (error) {
    throw error
  }
}
