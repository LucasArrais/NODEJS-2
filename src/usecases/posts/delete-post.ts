import type { PostsRepository } from '@/repositories/posts-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'
import { UnauthorizedError } from '../errors/unauthorized-error.js'

interface DeletePostUseCaseRequest {
  postPublicId: string
  requesterId: string
  requesterRole: 'ADMIN' | 'DEFAULT'
}

export class DeletePostUseCase {
  constructor(
    private postsRepository: PostsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    postPublicId,
    requesterId,
    requesterRole,
  }: DeletePostUseCaseRequest): Promise<void> {
    const post = await this.postsRepository.findByPublicId(postPublicId)

    if (!post) {
      throw new ResourceNotFoundError()
    }

    if (requesterRole !== 'ADMIN') {
      const user = await this.usersRepository.findByPublicId(requesterId)

      if (!user || post.usuarioId !== user.id) {
        throw new UnauthorizedError()
      }
    }

    await this.postsRepository.delete(postPublicId)
  }
}
