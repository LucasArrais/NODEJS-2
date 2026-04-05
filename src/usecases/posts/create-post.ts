import type { Post } from '@/@types/prisma/client.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface CreatePostRequest {
  titulo: string
  conteudo: string
  userPublicId: string
}

interface CreatePostResponse {
  post: Post
}

export class CreatePostUseCase {
  constructor(
    private postsRepository: PostsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    titulo,
    conteudo,
    userPublicId,
  }: CreatePostRequest): Promise<CreatePostResponse> {
    const user = await this.usersRepository.findBy({
      public_id: userPublicId,
    })

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const post = await this.postsRepository.create({
      titulo,
      conteudo,
      usuario: {
        connect: {
          id: user.id,
        },
      },
    })

    return { post }
  }
}
