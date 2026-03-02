import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeGetCommentUseCase } from '@/usecases/factories/make-get-comment.js'

export async function getCommentController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    commentPublicId: z.string().uuid()
  })

  const { commentPublicId } = paramsSchema.parse(request.params)

  const useCase = makeGetCommentUseCase()

  const result = await useCase.execute({ commentPublicId })

  return reply.status(200).send(result)
}