import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error.js'
import type { CommentsRepository } from '@/repositories/comments-repository.js'

interface DeleteCommentUseCaseRequest {
  publicId: string
  requesterPublicId: string
  requesterRole: 'ADMIN' | 'DEFAULT'
}

export class DeleteCommentUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({
    publicId,
    requesterPublicId,
    requesterRole,
  }: DeleteCommentUseCaseRequest): Promise<void> {

    const comment =
      await this.commentsRepository.findByPublicIdWithUser(publicId)

    if (!comment) {
      throw new ResourceNotFoundError()
    }

    const isOwner = comment.usuario.public_id === requesterPublicId
    const isAdmin = requesterRole === 'ADMIN'

    if (!isOwner && !isAdmin) {
      throw new Error('Forbidden')
    }

    await this.commentsRepository.delete(publicId)
  }
}