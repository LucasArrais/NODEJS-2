import type { Post } from '@/@types/prisma/client.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'
import { UnauthorizedError } from '../errors/unauthorized-error.js'

interface UpdatePostUseCaseRequest {
  publicId: string
  titulo?: string
  conteudo?: string
  requesterId: string
  requesterRole: 'ADMIN' | 'DEFAULT'
}

interface UpdatePostUseCaseResponse {
  post: Post
}

export class UpdatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    publicId,
    titulo,
    conteudo,
    requesterId,
    requesterRole,
  }: UpdatePostUseCaseRequest): Promise<UpdatePostUseCaseResponse> {

    const post = await this.postsRepository.findByPublicId(publicId)

    if (!post) {
      throw new ResourceNotFoundError()
    }

    if (
      requesterRole !== 'ADMIN' &&
      post.usuario.public_id !== requesterId
    ) {
      throw new UnauthorizedError()
    }

    const updatedPost = await this.postsRepository.update(publicId, {
      titulo,
      conteudo,
    })

    return { post: updatedPost }
  }
}