import { prisma } from '@/libs/prisma.js'

interface ListCommentsByPostRequest {
  postPublicId: string
}

export class ListCommentsByPostUseCase {
  async execute({ postPublicId }: ListCommentsByPostRequest) {
    const post = await prisma.post.findUnique({
      where: { public_id: postPublicId }
    })

    if (!post) {
      throw new Error('Post não encontrado')
    }

    const comments = await prisma.comment.findMany({
      where: { postId: post.id },
      include: {
        usuario: {
          select: {
            public_id: true,
            name: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    return {
      comments,
      total: comments.length
    }
  }
}