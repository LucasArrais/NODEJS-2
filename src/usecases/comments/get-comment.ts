import { prisma } from '@/libs/prisma.js'

interface GetCommentRequest {
  commentPublicId: string
}

export class GetCommentUseCase {
  async execute({ commentPublicId }: GetCommentRequest) {
    const comment = await prisma.comment.findUnique({
      where: { public_id: commentPublicId },
      include: {
        usuario: {
          select: {
            public_id: true,
            name: true,
            email: true,
          },
        },
        post: {
          select: {
            public_id: true,
            titulo: true,
          },
        },
      },
    })

    if (!comment) {
      throw new Error('Comentário não encontrado')
    }

    return { comment }
  }
}
