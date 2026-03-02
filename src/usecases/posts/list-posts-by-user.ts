import { prisma } from '@/libs/prisma.js'

interface ListPostsByUserRequest {
  userPublicId: string
}

export class ListPostsByUserUseCase {
  async execute({ userPublicId }: ListPostsByUserRequest) {
    const user = await prisma.user.findUnique({
      where: { public_id: userPublicId }
    })

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    const posts = await prisma.post.findMany({
      where: { usuarioId: user.id },
      orderBy: {
        created_at: 'desc'
      }
    })

    return {
      posts,
      total: posts.length
    }
  }
}