import { UserPresenter } from '@/http/presenters/user-presenter.js'
import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error.js'
import { makeUpdateUserUseCase } from '@/usecases/factories/make-update-user.js'
import type { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  try {
    const updateUserParamsSchema = z.object({
      publicId: z.string(),
    })

    const { publicId } = updateUserParamsSchema.parse(request.params)

    const loggedUser = request.user as {
      sub: string
      role: 'ADMIN' | 'DEFAULT'
    }

    // admin pode atualizar qualquer usuario, default só pode atualizar ele mesmo
    if (loggedUser.role !== 'ADMIN' && loggedUser.sub !== publicId) {
      return reply.status(403).send({ message: 'Forbidden' })
    }

    const updateBodySchema = z.object({
      name: z.string().trim().min(1).max(100).optional(),
      email: z.string().max(100).optional(),
      photo: z.string().nullable().optional().transform(val => val ?? null),
    })

    const { name, email, photo } =
      updateBodySchema.parse(request.body)

    const updateUserUseCase = makeUpdateUserUseCase()

    const { user } = await updateUserUseCase.execute({
      publicId,
      name,
      email,
      photo
    })

    return reply.status(200).send(UserPresenter.toHTTP(user))
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}