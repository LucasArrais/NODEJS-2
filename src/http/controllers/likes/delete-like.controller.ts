import { makeDeleteLikeUseCase } from '@/usecases/factories/make-delete-like.js'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function deleteLikeController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    postPublicId: z.string().uuid().optional(),
    commentPublicId: z.string().uuid().optional()
  })

  const { postPublicId, commentPublicId } = bodySchema.parse(request.body)

  const userId = Number(request.user.sub)

  if (!userId || isNaN(userId)) {
    return reply.status(401).send({ message: 'Usuário inválido no token' })
  }

  const useCase = makeDeleteLikeUseCase()

  await useCase.execute({
    userId,
    postPublicId,
    commentPublicId
  })

  return reply.status(204).send()

}