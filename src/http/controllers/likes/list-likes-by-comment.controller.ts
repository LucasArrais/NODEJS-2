import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeListLikesByCommentUseCase } from '@/usecases/factories/make-list-likes-by-comment.js'

export async function listLikesByCommentController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    commentPublicId: z.string().uuid()
  })

  const { commentPublicId } = paramsSchema.parse(request.params)

  const useCase = makeListLikesByCommentUseCase()

  const result = await useCase.execute({ commentPublicId })

  return reply.status(200).send(result)
}