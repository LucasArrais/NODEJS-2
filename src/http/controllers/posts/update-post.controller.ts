import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeUpdatePostUseCase } from '@/usecases/factories/make-update-post.js'
import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error.js'
import { UnauthorizedError } from '@/usecases/errors/unauthorized-error.js'

export async function update(
  request: FastifyRequest,
  reply: FastifyReply
) {

  const paramsSchema = z.object({
    publicId: z.string(),
  })

  const bodySchema = z.object({
    titulo: z.string().min(1).optional(),
    conteudo: z.string().min(1).optional(),
  })

  const { publicId } = paramsSchema.parse(request.params)
  const { titulo, conteudo } = bodySchema.parse(request.body)

  const loggedUser = request.user as {
    sub: string
    role: 'ADMIN' | 'DEFAULT'
  }

  try {
    const updatePostUseCase = makeUpdatePostUseCase()

    const { post } = await updatePostUseCase.execute({
      publicId,
      titulo,
      conteudo,
      requesterId: loggedUser.sub,
      requesterRole: loggedUser.role,
    })

    return reply.status(200).send({ post })

  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'Post not found' })
    }

    if (error instanceof UnauthorizedError) {
      return reply.status(403).send({ message: 'Forbidden' })
    }

    throw error
  }
}