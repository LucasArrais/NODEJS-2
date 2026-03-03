import type { CommentsRepository } from '@/repositories/comments-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'
import { UnauthorizedError } from '../errors/unauthorized-error.js'

interface DeleteCommentUseCaseRequest {
  commentPublicId: string
  requesterId: string
  requesterRole: 'ADMIN' | 'DEFAULT'
}

export class DeleteCommentUseCase {
  constructor(
    private commentsRepository: CommentsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    commentPublicId,
    requesterId,
    requesterRole,
  }: DeleteCommentUseCaseRequest): Promise<void> {

    console.log('========== DELETE COMMENT USECASE DEBUG ==========')
    console.log('1 - commentPublicId:', commentPublicId)
    console.log('2 - requesterId:', requesterId)
    console.log('3 - requesterRole:', requesterRole)

    const comment = await this.commentsRepository.findByPublicId(commentPublicId)
    console.log('4 - Comentário encontrado:', comment ? 'Sim' : 'Não')
    
    if (comment) {
      console.log('5 - Dono do comentário (usuarioId):', comment.usuarioId)
    }

    if (!comment) {
      console.log('6 - ERRO: Comentário não encontrado')
      throw new ResourceNotFoundError()
    }

    if (requesterRole !== 'ADMIN') {
      console.log('7 - Usuário não é ADMIN, verificando se é dono...')
      
      const user = await this.usersRepository.findByPublicId(requesterId)
      console.log('8 - Usuário requisitante encontrado:', user ? 'Sim' : 'Não')
      
      if (user) {
        console.log('9 - ID do usuário requisitante no banco:', user.id)
        console.log('10 - Comparação:', user.id, '===', comment.usuarioId, '?', user.id === comment.usuarioId)
      }

      if (!user || user.id !== comment.usuarioId) {
        console.log('11 - ERRO: Usuário não autorizado')
        throw new UnauthorizedError()
      }
      
      console.log('12 - Usuário autorizado (é dono do comentário)')
    } else {
      console.log('7 - Usuário é ADMIN, autorizado automaticamente')
    }

    console.log('13 - Deletando comentário...')
    await this.commentsRepository.delete(commentPublicId)
    console.log('14 - Comentário deletado com sucesso')
    console.log('==================================================')
  }
}