import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error.js'
import type { CommentsRepository } from '@/repositories/comments-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'

interface CreateCommentUseCaseRequest {
  conteudo: string
  userPublicId: string
  postPublicId: string
}

export class CreateCommentUseCase {
  constructor(
    private commentsRepository: CommentsRepository,
    private usersRepository: UsersRepository,
    private postsRepository: PostsRepository
  ) {}

  async execute({
    conteudo,
    userPublicId,
    postPublicId,
  }: CreateCommentUseCaseRequest) {
    const user = await this.usersRepository.findByPublicId(userPublicId)

    if (!user) {
      throw new ResourceNotFoundError()
    }
    const post = await this.postsRepository.findByPublicId(postPublicId)

    if (!post) {
      throw new ResourceNotFoundError()
    }
    const comment = await this.commentsRepository.create({
      conteudo,
      usuarioId: user.id,
      postId: post.id,
    })

    return {
      comment,
    }
  }
}