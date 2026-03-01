import type { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { makeListCommentsUseCase } from '@/usecases/factories/make-list-comments.js'

export async function list(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = querySchema.parse(request.query)

  const listCommentsUseCase = makeListCommentsUseCase()

  const { comments } = await listCommentsUseCase.execute({
    page,
  })

  return reply.status(200).send({
    comments,
  })
}