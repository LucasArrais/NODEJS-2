import type { FastifyReply, FastifyRequest } from 'fastify'
import type { USER_ROLE } from '@/@types/prisma/enums.js'

export function verifyUserRole(allowedRoles: USER_ROLE[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user as { sub: string; role: USER_ROLE }

    if (!allowedRoles.includes(role)) {
      return reply.status(403).send({ message: 'Forbidden' })
    }
  }
}
