import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeListLikesByPostUseCase } from '@/usecases/factories/make-list-likes-by-post.js'

export async function listLikesByPostController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    postPublicId: z.string().uuid()
  })

  const { postPublicId } = paramsSchema.parse(request.params)

  const useCase = makeListLikesByPostUseCase()

  const result = await useCase.execute({ postPublicId })

  return reply.status(200).send(result)
}