import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error.js'
import { makeUpdateCommentUseCase } from '@/usecases/factories/make-update-comment.js'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  try {
    const paramsSchema = z.object({
      publicId: z.string(),
    })

    const bodySchema = z.object({
      content: z.string().min(1),
    })

    const { publicId } = paramsSchema.parse(request.params)
    const { content } = bodySchema.parse(request.body)

    const loggedUser = request.user as {
      sub: string
      role: 'ADMIN' | 'DEFAULT'
    }

    const updateCommentUseCase = makeUpdateCommentUseCase()

    await updateCommentUseCase.execute({
      publicId,
      content,
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
