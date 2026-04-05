import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error.js'
import { makeGetPostUseCase } from '@/usecases/factories/make-get-post.js'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    publicId: z.string(),
  })

  const { publicId } = paramsSchema.parse(request.params)

  try {
    const getPostUseCase = makeGetPostUseCase()

    const { post } = await getPostUseCase.execute({ publicId })

    return reply.status(200).send({ post })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'Post not found' })
    }

    throw error
  }
}
