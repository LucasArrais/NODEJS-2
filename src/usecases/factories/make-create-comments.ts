import { PrismaCommentsRepository } from '@/repositories/prisma/comments-prisma-repository.js'
import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { CreateCommentUseCase } from '../comments/create-comment.js'

export function makeCreateCommentUseCase() {
  const commentsRepository = new PrismaCommentsRepository()
  const usersRepository = new PrismaUsersRepository()
  const postsRepository = new PrismaPostsRepository()

  const useCase = new CreateCommentUseCase(
    commentsRepository,
    usersRepository,
    postsRepository,
  )

  return useCase
}
