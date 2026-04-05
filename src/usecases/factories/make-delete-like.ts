import { PrismaCommentsRepository } from '@/repositories/prisma/comments-prisma-repository.js'
import { PrismaLikesRepository } from '@/repositories/prisma/likes-prisma-repository.js'
import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { DeleteLikeUseCase } from '../likes/delete-like.js'

export function makeDeleteLikeUseCase() {
  const likesRepository = new PrismaLikesRepository()
  const usersRepository = new PrismaUsersRepository()
  const postsRepository = new PrismaPostsRepository()
  const commentsRepository = new PrismaCommentsRepository()

  const deleteUseCase = new DeleteLikeUseCase(
    likesRepository,
    usersRepository,
    postsRepository,
    commentsRepository,
  )

  return deleteUseCase
}
