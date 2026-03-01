import { PrismaCommentsRepository } from '@/repositories/prisma/comments-prisma-repository.js'
import { ListCommentsUseCase } from '../comments/list-comments.js'

export function makeListCommentsUseCase() {
  const commentsRepository = new PrismaCommentsRepository()

  const useCase = new ListCommentsUseCase(commentsRepository)

  return useCase
}