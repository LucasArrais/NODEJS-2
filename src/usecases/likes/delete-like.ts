import type { CommentsRepository } from '@/repositories/comments-repository.js'
import type { LikesRepository } from '@/repositories/likes-repository.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'
import { UnauthorizedError } from '../errors/unauthorized-error.js'

interface DeleteLikeUseCaseRequest {
  userId: string
  postPublicId?: string
  commentPublicId?: string
}

export class DeleteLikeUseCase {
  constructor(
    private likesRepository: LikesRepository,
    private usersRepository: UsersRepository,
    private postsRepository: PostsRepository,
    private commentsRepository: CommentsRepository,
  ) {}

  async execute({
    userId,
    postPublicId,
    commentPublicId,
  }: DeleteLikeUseCaseRequest): Promise<void> {
    const user = await this.usersRepository.findByPublicId(userId)
    if (!user) {
      throw new ResourceNotFoundError()
    }

    let postId: number | null = null
    let commentId: number | null = null

    if (postPublicId) {
      const post = await this.postsRepository.findByPublicId(postPublicId)
      if (!post) {
        throw new ResourceNotFoundError()
      }
      postId = post.id
    }

    if (commentPublicId) {
      const comment =
        await this.commentsRepository.findByPublicId(commentPublicId)
      if (!comment) {
        throw new ResourceNotFoundError()
      }
      commentId = comment.id
    }

    const like = await this.likesRepository.findByUserAndTarget({
      userId: user.id,
      postId,
      commentId,
    })

    if (!like) {
      throw new ResourceNotFoundError()
    }

    if (like.usuarioId !== user.id) {
      throw new UnauthorizedError()
    }

    await this.likesRepository.delete(like.id)
  }
}
