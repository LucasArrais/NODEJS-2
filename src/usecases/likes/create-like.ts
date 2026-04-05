import type { CommentsRepository } from '@/repositories/comments-repository.js'
import type { LikesRepository } from '@/repositories/likes-repository.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error.js'

interface CreateLikeUseCaseRequest {
  requesterPublicId: string
  postPublicId?: string
  commentPublicId?: string
}

export class CreateLikeUseCase {
  constructor(
    private likesRepository: LikesRepository,
    private usersRepository: UsersRepository,
    private postsRepository: PostsRepository,
    private commentsRepository: CommentsRepository,
  ) {}

  async execute({
    requesterPublicId,
    postPublicId,
    commentPublicId,
  }: CreateLikeUseCaseRequest) {
    if (!postPublicId && !commentPublicId) {
      throw new Error('Like must reference a post or a comment')
    }

    if (postPublicId && commentPublicId) {
      throw new Error('Like cannot reference both post and comment')
    }

    const user = await this.usersRepository.findByPublicId(requesterPublicId)

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
    const alreadyExists = await this.likesRepository.findByUserAndTarget({
      userId: user.id,
      postId,
      commentId,
    })

    if (alreadyExists) {
      throw new Error('Like already exists')
    }

    const like = await this.likesRepository.create({
      usuario: {
        connect: { id: user.id },
      },
      ...(postId && {
        post: { connect: { id: postId } },
      }),
      ...(commentId && {
        comment: { connect: { id: commentId } },
      }),
    })

    return { like }
  }
}
