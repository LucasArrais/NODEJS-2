import { PrismaCommentsRepository } from '@/repositories/prisma/comments-prisma-repository.js'
import { UpdateCommentUseCase } from '../comments/update-comment.js'

export function makeUpdateCommentUseCase() {
  const commentsRepository = new PrismaCommentsRepository()

  const useCase = new UpdateCommentUseCase(commentsRepository)

  return useCase
}