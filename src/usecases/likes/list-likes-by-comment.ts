import { prisma } from '@/libs/prisma.js'

interface ListLikesByCommentRequest {
  commentPublicId: string
}

export class ListLikesByCommentUseCase {
  async execute({ commentPublicId }: ListLikesByCommentRequest) {
    const comment = await prisma.comment.findUnique({
      where: { public_id: commentPublicId }
    })

    if (!comment) {
      throw new Error('Comentário não encontrado')
    }

    const likes = await prisma.like.findMany({
      where: { commentId: comment.id },
      include: {
        usuario: {
          select: {
            id: true,
            name: true,
            email: true,
            public_id: true
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