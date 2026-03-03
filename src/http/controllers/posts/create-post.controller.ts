import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeCreatePostUseCase } from '@/usecases/factories/make-create-post.js'
import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error.js'

export async function create(request: FastifyRequest, reply: FastifyReply) {

  const createPostBodySchema = z.object({
    titulo: z.string().min(1),
    conteudo: z.string().min(1),
  })

  const { titulo, conteudo } =
    createPostBodySchema.parse(request.body)

  try {
    const createPostUseCase = makeCreatePostUseCase()
    console.log('User ID from JWT:', request.user.sub) 
    const { post } = await createPostUseCase.execute({
      titulo,
      conteudo,
      userPublicId: request.user.sub,
    })

    return reply.status(201).send(post)

  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'User not found' })
    }

    throw error
  }
}