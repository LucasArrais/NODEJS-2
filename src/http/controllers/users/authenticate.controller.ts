import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserPresenter } from '@/http/presenters/user-presenter.js'
import { makeAuthenticateUseCase } from '@/usecases/factories/make-authenticate.js'
import { InvalidCredentialsError } from '@/usecases/errors/invalid-credential-error.js'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    try {
        const authenticateBodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(8).max(100),
        })

        const { email, password } = authenticateBodySchema.parse(request.body)

        const authenticateUseCase = makeAuthenticateUseCase()

        const { user } = await authenticateUseCase.execute({
            login: email,
            password,
        })

        const token = await reply.jwtSign(
  {
    sub: user.id.toString(),   
    role: user.role
  },
  {
    expiresIn: '1d'
  }
)

        return reply.status(200).send({
            ...UserPresenter.toHTTP(user),
            token,
        })
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: error.message })
        }
        throw error
    }
}