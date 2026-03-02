import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeGetLikeUseCase } from '@/usecases/factories/make-get-like.js'

export async function getLikeController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    likeId: z.coerce.number()
  })

  const { likeId } = paramsSchema.parse(request.params)

  const useCase = makeGetLikeUseCase()

  const result = await useCase.execute({ likeId })

  return reply.status(200).send(result)
}