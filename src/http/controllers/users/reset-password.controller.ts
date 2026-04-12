import type { FastifyRequest, FastifyReply } from 'fastify'
import { makeResetPasswordUseCase } from '../../../usecases/factories/make-reset-password.js'

export async function resetPasswordController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { token } = request.params as { token: string }
  const { password } = request.body as { password: string }

  const useCase = makeResetPasswordUseCase()

  await useCase.execute({ token, password })

  return reply.send({
    message: 'Senha atualizada com sucesso',
  })
}