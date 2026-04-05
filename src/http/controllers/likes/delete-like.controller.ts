import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error.js'
import { UnauthorizedError } from '@/usecases/errors/unauthorized-error.js'
import { makeDeleteLikeUseCase } from '@/usecases/factories/make-delete-like.js'

export async function deleteLikeController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const bodySchema = z
      .object({
        postPublicId: z.string().optional(),
        commentPublicId: z.string().optional(),
      })
      .refine((data) => data.postPublicId || data.commentPublicId, {
        message: 'É necessário fornecer postPublicId ou commentPublicId',
      })

    const { postPublicId, commentPublicId } = bodySchema.parse(request.body)

    const loggedUser = request.user as {
      sub: string
      role: 'ADMIN' | 'DEFAULT'
    }

    const deleteLikeUseCase = makeDeleteLikeUseCase()

    await deleteLikeUseCase.execute({
      userId: loggedUser.sub,
      postPublicId,
      commentPublicId,
    })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'Like not found' })
    }

    if (error instanceof UnauthorizedError) {
      return reply.status(403).send({ message: 'Forbidden' })
    }

    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        message: 'Invalid data',
        issues: error.issues,
      })
    }

    throw error
  }
}
