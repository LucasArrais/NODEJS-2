import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error.js'
import { UnauthorizedError } from '@/usecases/errors/unauthorized-error.js'
import { makeDeletePostUseCase } from '@/usecases/factories/make-delete-post.js'
import type { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'

export async function deletePostController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    console.log('1 - Iniciando deletePostController')
    console.log('2 - Params:', request.params)
    
    const paramsSchema = z.object({
      postId: z.string(),
    })

    const { postId } = paramsSchema.parse(request.params)
    console.log('3 - postId extraído:', postId)

    const loggedUser = request.user as {
      sub: string
      role: 'ADMIN' | 'DEFAULT'
    }
    console.log('4 - Usuário logado:', loggedUser)

    const deletePostUseCase = makeDeletePostUseCase()
    console.log('5 - UseCase criado')

    await deletePostUseCase.execute({
      postPublicId: postId,
      requesterId: loggedUser.sub,
      requesterRole: loggedUser.role,
    })
    console.log('6 - UseCase executado com sucesso')

    return reply.status(204).send()

  } catch (error) {
    console.log('❌ ERRO NO CONTROLLER:', error)
    
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'Post not found' })
    }

    if (error instanceof UnauthorizedError) {
      return reply.status(403).send({ message: 'Forbidden' })
    }

    if (error instanceof z.ZodError) {
      return reply.status(400).send({ message: 'Invalid params', issues: error.issues })
    }

    return reply.status(500).send({ message: 'Internal server error' })
  }
}