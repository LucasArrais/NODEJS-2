import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error.js'
import { UnauthorizedError } from '@/usecases/errors/unauthorized-error.js'
import { makeDeleteCommentUseCase } from '@/usecases/factories/make-delete-comment.js'
import type { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'

export async function deleteCommentController(
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
      commentPublicId: publicId,
      requesterId: loggedUser.sub,
      requesterRole: loggedUser.role,
    })

    return reply.status(204).send()

  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'Comment not found' })
    }

    if (error instanceof UnauthorizedError) {
      return reply.status(403).send({ message: 'Forbidden' })
    }

    if (error instanceof z.ZodError) {
      return reply.status(400).send({ message: 'Invalid params', issues: error.issues })
    }

    return reply.status(500).send({ message: 'Internal server error' })
  }
}