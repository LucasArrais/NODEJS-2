import { PrismaCommentsRepository } from '@/repositories/prisma/comments-prisma-repository.js'
import { DeleteCommentUseCase } from '../comments/delete-comment.js'

export function makeDeleteCommentUseCase() {
  const commentsRepository = new PrismaCommentsRepository()

  const useCase = new DeleteCommentUseCase(commentsRepository)

  return useCase
}