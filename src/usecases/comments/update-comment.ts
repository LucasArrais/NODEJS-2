import type { CommentsRepository } from '@/repositories/comments-repository.js'
import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error.js'

interface UpdateCommentUseCaseRequest {
  publicId: string
  content: string
  requesterPublicId: string
  requesterRole: 'ADMIN' | 'DEFAULT'
}

export class UpdateCommentUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({
    publicId,
    content,
    requesterPublicId,
    requesterRole,
  }: UpdateCommentUseCaseRequest): Promise<void> {
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

    await this.commentsRepository.update(publicId, {
      conteudo: content,
    })
  }
}
