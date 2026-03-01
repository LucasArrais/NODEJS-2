import type { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { makeDeleteCommentUseCase } from '@/usecases/factories/make-delete-comment.js'
import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error.js'

export async function remove(
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

    const deleteCommentUseCase = makeDeleteCommentUseCase()

    await deleteCommentUseCase.execute({
      publicId,
      requesterPublicId: loggedUser.sub,
      requesterRole: loggedUser.role,
    })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'Comment not found' })
    }

    if (error instanceof Error && error.message === 'Forbidden') {
      return reply.status(403).send({ message: 'Forbidden' })
    }

    throw error
  }
}