import type { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateCommentUseCase } from '@/usecases/factories/make-create-comments.js'
import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error.js'
import z from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  try {
    const createCommentBodySchema = z.object({
      conteudo: z.string().min(1),
      postPublicId: z.string(),
    })

    const { conteudo, postPublicId } =
      createCommentBodySchema.parse(request.body)

    const loggedUser = request.user as {
      sub: string
      role: 'ADMIN' | 'DEFAULT'
    }

    const createCommentUseCase = makeCreateCommentUseCase()

    const { comment } = await createCommentUseCase.execute({
      conteudo,
      userPublicId: loggedUser.sub,
      postPublicId,
    })

    return reply.status(201).send(comment)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}