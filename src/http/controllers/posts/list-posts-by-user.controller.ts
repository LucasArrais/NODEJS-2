import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeListPostsByUserUseCase } from '@/usecases/factories/make-list-posts-by-user.js'

export async function listPostsByUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    userPublicId: z.string().uuid(),
  })

  const { userPublicId } = paramsSchema.parse(request.params)

  const useCase = makeListPostsByUserUseCase()

  const result = await useCase.execute({ userPublicId })

  return reply.status(200).send(result)
}
