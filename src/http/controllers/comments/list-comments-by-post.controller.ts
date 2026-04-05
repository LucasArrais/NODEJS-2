import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeListCommentsByPostUseCase } from '@/usecases/factories/make-list-comments-by-post.js'

export async function listCommentsByPostController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    postPublicId: z.string().uuid(),
  })

  const { postPublicId } = paramsSchema.parse(request.params)

  const useCase = makeListCommentsByPostUseCase()

  const result = await useCase.execute({ postPublicId })

  return reply.status(200).send(result)
}
