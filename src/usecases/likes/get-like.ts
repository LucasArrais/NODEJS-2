import { prisma } from '@/libs/prisma.js'

interface GetLikeRequest {
  likeId: number
}

export class GetLikeUseCase {
  async execute({ likeId }: GetLikeRequest) {
    const like = await prisma.like.findUnique({
      where: { id: likeId },
      include: {
        usuario: {
          select: {
            public_id: true,
            name: true
          }
        },
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

    if (!like) {
      throw new Error('Like não encontrado')
    }

    return { like }
  }
}