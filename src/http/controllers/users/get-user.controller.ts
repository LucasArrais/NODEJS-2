import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { UserPresenter } from '@/http/presenters/user-presenter.js'
import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error.js'
import { makeGetUserUseCase } from '@/usecases/factories/make-get-user.js'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getUserParamsSchema = z.object({
      publicId: z.string(),
    })

    const { publicId } = getUserParamsSchema.parse(request.params)

    const getUserUseCase = makeGetUserUseCase()

    const { user } = await getUserUseCase.execute({ publicId })

    return reply.status(200).send(UserPresenter.toHTTP(user))
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
