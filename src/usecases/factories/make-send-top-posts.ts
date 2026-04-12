import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { SendTopPostsUseCase } from '../posts/send-top-posts.js'

export function makeSendTopPostsDigestUseCase() {
  const postsRepository = new PrismaPostsRepository()
  const usersRepository = new PrismaUsersRepository()
  const sendDigestUseCase = new SendTopPostsUseCase(
    postsRepository,
    usersRepository
  )

  return sendDigestUseCase
}