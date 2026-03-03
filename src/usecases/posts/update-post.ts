import type { Post } from '@/@types/prisma/client.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'
import { UnauthorizedError } from '../errors/unauthorized-error.js'

interface UpdatePostUseCaseRequest {
  postPublicId: string
  requesterId: string
  requesterRole: 'ADMIN' | 'DEFAULT'
  titulo?: string
  conteudo?: string
}

interface UpdatePostUseCaseResponse {
  post: Post
}

export class UpdatePostUseCase {
  constructor(
    private postsRepository: PostsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    postPublicId,
    requesterId,
    requesterRole,
    titulo,
    conteudo,
  }: UpdatePostUseCaseRequest): Promise<UpdatePostUseCaseResponse> {

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

    if (!titulo && !conteudo) {
      return { post }
    }

    const updateData: any = {}
    if (titulo !== undefined) updateData.titulo = titulo
    if (conteudo !== undefined) updateData.conteudo = conteudo

    const updatedPost = await this.postsRepository.update(postPublicId, updateData)

    return { post: updatedPost }
  }
}