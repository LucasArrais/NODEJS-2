import type { PostsRepository } from '@/repositories/posts-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'
import { UnauthorizedError } from '../errors/unauthorized-error.js'

interface DeletePostUseCaseRequest {
  publicId: string
  requesterId: string
  requesterRole: 'ADMIN' | 'DEFAULT'
}

export class DeletePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    publicId,
    requesterId,
    requesterRole,
  }: DeletePostUseCaseRequest): Promise<void> {

    console.log('🔎 DELETE POST USE CASE EXECUTANDO')
    console.log('PublicId recebido:', publicId)

    const post = await this.postsRepository.findByPublicId(publicId)

    console.log('📦 POST RETORNADO DO REPOSITORY:', post)

    if (!post) {
      throw new ResourceNotFoundError()
    }

    console.log('👤 Usuário logado:', requesterId)
    console.log('📝 Dono do post:', post.usuario?.public_id)

    // Regra de autorização
    if (
      requesterRole !== 'ADMIN' &&
      post.usuario?.public_id !== requesterId
    ) {
      console.log('⛔ NÃO AUTORIZADO')
      throw new UnauthorizedError()
    }

    console.log('✅ AUTORIZADO — DELETANDO POST')

    await this.postsRepository.delete(publicId)
  }
}