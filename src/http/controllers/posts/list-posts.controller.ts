import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeListPostsUseCase } from '@/usecases/factories/make-list-posts.js'

export async function list(_request: FastifyRequest, reply: FastifyReply) {
  const listPostsUseCase = makeListPostsUseCase()

  const { posts } = await listPostsUseCase.execute()

  return reply.status(200).send({ posts })
}
