import { prisma } from '@/libs/prisma.js'

interface ListLikesByUserRequest {
  userPublicId: string
}

export class ListLikesByUserUseCase {
  async execute({ userPublicId }: ListLikesByUserRequest) {
    const user = await prisma.user.findUnique({
      where: { public_id: userPublicId }
    })

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    const likes = await prisma.like.findMany({
      where: { usuarioId: user.id },
      include: {
        post: {
          select: {
            public_id: true,
            titulo: true
          }
        },
        comment: {
          select: {
            public_id: true,
            conteudo: true
          }
        }
      }
    })

    return {
      likes,
      total: likes.length
    }
  }
}