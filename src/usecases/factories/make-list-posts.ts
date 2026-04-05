import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { ListPostsUseCase } from '../posts/list-posts.js'

export function makeListPostsUseCase() {
  const postsRepository = new PrismaPostsRepository()
  return new ListPostsUseCase(postsRepository)
}
