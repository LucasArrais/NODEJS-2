import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error.js'
import { UnauthorizedError } from '@/usecases/errors/unauthorized-error.js'
import { makeDeleteUserUseCase } from '@/usecases/factories/make-delete-user.js'
import type { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'

export async function deleteUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const paramsSchema = z.object({
      publicId: z.string(),
    })

    const { publicId } = paramsSchema.parse(request.params)

    const loggedUser = request.user as {
      sub: string
      role: 'ADMIN' | 'DEFAULT'
    }

    const deleteUserUseCase = makeDeleteUserUseCase()

    await deleteUserUseCase.execute({
      publicId,
      requesterId: loggedUser.sub,
      requesterRole: loggedUser.role,
    })

    return reply.status(204).send()

  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'User not found' })
    }

    if (error instanceof UnauthorizedError) {
      return reply.status(403).send({ message: 'Forbidden' })
    }

    throw error
  }
}