import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { UpdatePostUseCase } from '../posts/update-post.js'

export function makeUpdatePostUseCase() {
  const postsRepository = new PrismaPostsRepository()
  const usersRepository = new PrismaUsersRepository()
  const updateUseCase = new UpdatePostUseCase(postsRepository, usersRepository)

  return updateUseCase
}