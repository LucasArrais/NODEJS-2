import type { Post } from '@/@types/prisma/client.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'

interface ListPostsUseCaseResponse {
  posts: Post[]
}

export class ListPostsUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(): Promise<ListPostsUseCaseResponse> {
    const posts = await this.postsRepository.list()

    return { posts }
  }
}
