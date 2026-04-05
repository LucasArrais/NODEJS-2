import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error.js'
import { makeCreateLikeUseCase } from '@/usecases/factories/make-create-like.js'

export async function createLikeController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createLikeBodySchema = z
    .object({
      postPublicId: z.string().uuid().optional(),
      commentPublicId: z.string().uuid().optional(),
    })
    .refine(
      (data) =>
        (data.postPublicId && !data.commentPublicId) ||
        (!data.postPublicId && data.commentPublicId),
      {
        message:
          'Você deve enviar apenas postPublicId ou commentPublicId (exatamente um)',
      },
    )

  const { postPublicId, commentPublicId } = createLikeBodySchema.parse(
    request.body,
  )

  const requesterPublicId = request.user.sub

  try {
    const createLikeUseCase = makeCreateLikeUseCase()

    const { like } = await createLikeUseCase.execute({
      requesterPublicId,
      postPublicId,
      commentPublicId,
    })

    return reply.status(201).send({
      like,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: 'Recurso não encontrado',
      })
    }

    if (err instanceof Error) {
      if (err.message === 'Like already exists') {
        return reply.status(409).send({
          message: err.message,
        })
      }

      if (
        err.message.includes('Like must') ||
        err.message.includes('Like cannot')
      ) {
        return reply.status(400).send({
          message: err.message,
        })
      }
    }

    throw err
  }
}
