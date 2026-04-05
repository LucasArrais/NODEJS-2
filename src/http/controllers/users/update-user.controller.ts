import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error.js'
import { makeUpdateUserUseCase } from '@/usecases/factories/make-update-user.js'

export async function updateProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const bodySchema = z.object({
      name: z.string().optional(),
      email: z.string().email().optional(),
      password: z.string().min(8).optional(),
      photo: z.string().nullable().optional(),
    })

    const { name, email, password, photo } = bodySchema.parse(request.body)

    const userPublicId = request.user.sub

    const updateUserUseCase = makeUpdateUserUseCase()

    const { user } = await updateUserUseCase.execute({
      userPublicId,
      requesterId: userPublicId,
      requesterRole: request.user.role,
      name,
      email,
      password,
      photo,
    })

    const { password: _, ...userWithoutPassword } = user

    return reply.status(200).send({
      message: 'Perfil atualizado com sucesso',
      user: userWithoutPassword,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: 'Usuário não encontrado',
      })
    }

    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        message: 'Dados inválidos',
        issues: error.issues,
      })
    }

    console.error('Erro inesperado:', error)
    return reply.status(500).send({
      message: 'Erro interno do servidor',
    })
  }
}
