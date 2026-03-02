import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeListLikesByUserUseCase } from '@/usecases/factories/make-list-likes-by-user.js'

export async function listLikesByUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    userPublicId: z.string().uuid()
  })

  const { userPublicId } = paramsSchema.parse(request.params)

  const useCase = makeListLikesByUserUseCase()

  const result = await useCase.execute({ userPublicId })

  return reply.status(200).send(result)
}