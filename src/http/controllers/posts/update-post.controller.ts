import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error.js'
import { UnauthorizedError } from '@/usecases/errors/unauthorized-error.js'
import { makeUpdatePostUseCase } from '@/usecases/factories/make-update-post.js'

export async function updatePostController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const paramsSchema = z.object({
      postId: z.string(),
    })

    const bodySchema = z.object({
      titulo: z.string().min(1).optional(),
      conteudo: z.string().min(1).optional(),
    })

    const { postId } = paramsSchema.parse(request.params)
    const { titulo, conteudo } = bodySchema.parse(request.body)

    const loggedUser = request.user as {
      sub: string
      role: 'ADMIN' | 'DEFAULT'
    }

    const updatePostUseCase = makeUpdatePostUseCase()

    const { post } = await updatePostUseCase.execute({
      postPublicId: postId,
      requesterId: loggedUser.sub,
      requesterRole: loggedUser.role,
      titulo,
      conteudo,
    })

    return reply.status(200).send(post)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'Post not found' })
    }

    if (error instanceof UnauthorizedError) {
      return reply.status(403).send({ message: 'Forbidden' })
    }

    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        message: 'Invalid data',
        issues: error.issues,
      })
    }

    throw error
  }
}
