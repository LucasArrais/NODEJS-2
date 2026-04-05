import type { USER_ROLE } from './prisma/enums.js'
import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { sub: string; role: USER_ROLE }
    user: { sub: string; role: USER_ROLE }
  }
}
