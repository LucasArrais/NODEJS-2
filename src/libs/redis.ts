import { Redis } from 'ioredis'

const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  retryStrategy: (times: number) => {
    const delay = Math.min(times * 50, 2000)
    return delay
  },
})

redisClient.on('connect', () => {
  console.log('Redis connected successfully')
})

redisClient.on('error', (err: Error) => {
  console.error('Redis connection error:', err)
})

export default redisClient
