import type { Post } from '@/@types/prisma/client.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface GetPostUseCaseRequest {
  publicId: string
}

interface GetPostUseCaseResponse {
  post: Post
}

export class GetPostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    publicId,
  }: GetPostUseCaseRequest): Promise<GetPostUseCaseResponse> {
    const post = await this.postsRepository.findByPublicId(publicId)

    if (!post) {
      throw new ResourceNotFoundError()
    }

    return { post }
  }
}
