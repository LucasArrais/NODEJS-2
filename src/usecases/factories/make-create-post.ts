import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { CreatePostUseCase } from '../posts/create-post.js'

export function makeCreatePostUseCase() {
  const postsRepository = new PrismaPostsRepository()
  const usersRepository = new PrismaUsersRepository()

  return new CreatePostUseCase(postsRepository, usersRepository)
}
