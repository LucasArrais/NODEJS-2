import type { FastifyRequest, FastifyReply } from 'fastify'
import { makeSendRecoverPasswordUseCase } from '../../../usecases/factories/make-send-recover-password.js'

export async function sendRecoverPasswordController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email } = request.body as { email: string }

  const useCase = makeSendRecoverPasswordUseCase()

  await useCase.execute({ email })

  return reply.status(200).send({
    message: 'Se o email existir, um link foi enviado',
  })
}