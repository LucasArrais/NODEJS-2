import { prisma } from '@/libs/prisma.js'

interface ListLikesByPostRequest {
  postPublicId: string
}

export class ListLikesByPostUseCase {
  async execute({ postPublicId }: ListLikesByPostRequest) {
    const post = await prisma.post.findUnique({
      where: { public_id: postPublicId }
    })

    if (!post) {
      throw new Error('Post não encontrado')
    }

    const likes = await prisma.like.findMany({
      where: { postId: post.id },
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

    return { likes, total: likes.length }
  }
}