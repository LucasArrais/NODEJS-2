import { PrismaCommentsRepository } from '@/repositories/prisma/comments-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { DeleteCommentUseCase } from '../comments/delete-comment.js'

export function makeDeleteCommentUseCase() {
  const commentsRepository = new PrismaCommentsRepository()
  const usersRepository = new PrismaUsersRepository()
  const deleteUseCase = new DeleteCommentUseCase(
    commentsRepository,
    usersRepository,
  )

  return deleteUseCase
}
