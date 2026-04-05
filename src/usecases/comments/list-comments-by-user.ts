import { prisma } from '@/libs/prisma.js'

interface ListCommentsByUserRequest {
  userPublicId: string
}

export class ListCommentsByUserUseCase {
  async execute({ userPublicId }: ListCommentsByUserRequest) {
    const user = await prisma.user.findUnique({
      where: { public_id: userPublicId },
    })

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    const comments = await prisma.comment.findMany({
      where: { usuarioId: user.id },
      include: {
        post: {
          select: {
            public_id: true,
            titulo: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    return {
      comments,
      total: comments.length,
    }
  }
}
