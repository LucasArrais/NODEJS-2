import fastify from 'fastify'
import { appRoutes } from './http/controllers/routes.js'
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'
import { env } from './env/index.js'
import { ResourceNotFoundError } from './usecases/errors/resource-not-found-error.js'
import { UnauthorizedError } from './usecases/errors/unauthorized-error.js'

export const app = fastify()

app.register(fastifyJwt,{
    secret: env.JWT_SECRET,
}) 

app.register(appRoutes)

app.setErrorHandler((error, _request, reply) => {
  console.log(error)

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  if (error instanceof ResourceNotFoundError) {
    return reply.status(404).send({ message: error.message })
  }
  
  if (error instanceof UnauthorizedError) {
    return reply.status(403).send({ message: error.message })
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})