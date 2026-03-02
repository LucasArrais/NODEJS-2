import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeListCommentsByUserUseCase } from '@/usecases/factories/make-list-comments-by-user.js'

export async function listCommentsByUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    userPublicId: z.string().uuid()
  })

  const { userPublicId } = paramsSchema.parse(request.params)

  const useCase = makeListCommentsByUserUseCase()

  const result = await useCase.execute({ userPublicId })

  return reply.status(200).send(result)
}