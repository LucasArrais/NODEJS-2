import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { GetPostUseCase } from '../posts/get-post.js'

export function makeGetPostUseCase() {
  const postsRepository = new PrismaPostsRepository()
  return new GetPostUseCase(postsRepository)
}
