import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeListUsersUseCase } from '@/usecases/factories/make-list-users.js'
import redisClient from '@/libs/redis.js'

export async function list(_request: FastifyRequest, reply: FastifyReply) {
  const cacheKey = 'users:list'
  
  try {
    const cachedUsers = await (redisClient as any).get(cacheKey)
    
    if (cachedUsers) {
      console.log('✅ Cache HIT - Servindo do Redis')
      return reply.status(200).send(JSON.parse(cachedUsers))
    }
    
    console.log('❌ Cache MISS - Consultando banco de dados')
  } catch (err) {
    console.log('Redis error, continuing without cache')
  }
  
  try {
    const listUsersUseCase = makeListUsersUseCase()

    const { users } = await listUsersUseCase.execute()

    const usersHTTP = users.map(user => ({
      id: user.id,
      public_id: user.public_id,
      name: user.name,
      email: user.email,
      photo: null,
      role: 'DEFAULT'
    }))

    try {
      await (redisClient as any).setex(cacheKey, 60, JSON.stringify(usersHTTP))
      console.log('💾 Dados salvos no Redis com TTL de 60 segundos')
    } catch (err) {
      console.log('Failed to save to Redis')
    }

    return reply.status(200).send(usersHTTP)
  } catch (error) {
    throw error
  }
}