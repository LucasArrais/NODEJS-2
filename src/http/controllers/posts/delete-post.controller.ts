import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeDeletePostUseCase } from '@/usecases/factories/make-delete-post.js'
import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error.js'
import { UnauthorizedError } from '@/usecases/errors/unauthorized-error.js'

export async function remove(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    publicId: z.string(),
  })

  const { publicId } = paramsSchema.parse(request.params)

  const loggedUser = request.user as {
    sub: string
    role: 'ADMIN' | 'DEFAULT'
  }

  try {
    const deletePostUseCase = makeDeletePostUseCase()

    await deletePostUseCase.execute({
      publicId,
      requesterId: loggedUser.sub,
      requesterRole: loggedUser.role,
    })

    return reply.status(204).send()

  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'Post not found' })
    }

    if (error instanceof UnauthorizedError) {
      return reply.status(403).send({ message: 'Forbidden' })
    }

    throw error
  }
}