import { PrismaLikesRepository } from '@/repositories/prisma/likes-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { PrismaCommentsRepository } from '@/repositories/prisma/comments-prisma-repository.js'
import { CreateLikeUseCase } from '../likes/create-like.js'

export function makeCreateLikeUseCase() {
  const likesRepository = new PrismaLikesRepository()
  const usersRepository = new PrismaUsersRepository()
  const postsRepository = new PrismaPostsRepository()
  const commentsRepository = new PrismaCommentsRepository()

  const useCase = new CreateLikeUseCase(
    likesRepository,
    usersRepository,
    postsRepository,
    commentsRepository
  )

  return useCase
}