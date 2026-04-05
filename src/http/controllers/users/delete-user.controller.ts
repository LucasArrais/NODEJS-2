import type { FastifyReply, FastifyRequest } from 'fastify'
import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error.js'
import { makeDeleteUserUseCase } from '@/usecases/factories/make-delete-user.js'

export async function deleteUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const loggedUser = request.user as {
      sub: string
      role: 'ADMIN' | 'DEFAULT'
    }

    const deleteUserUseCase = makeDeleteUserUseCase()

    await deleteUserUseCase.execute({
      userPublicId: loggedUser.sub,
      requesterId: loggedUser.sub,
      requesterRole: loggedUser.role,
    })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'User not found' })
    }

    throw error
  }
}
