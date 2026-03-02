import { prisma } from '@/libs/prisma.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface DeleteLikeRequest {
  userId: number
  postPublicId?: string
  commentPublicId?: string
}

export class DeleteLikeUseCase {
  async execute({ userId, postPublicId, commentPublicId }: DeleteLikeRequest) {
    if (!postPublicId && !commentPublicId) {
      throw new Error('É necessário informar postPublicId ou commentPublicId')
    }

    let like

    if (postPublicId) {
      const post = await prisma.post.findUnique({
        where: { public_id: postPublicId }
      })

      if (!post) {
        throw new ResourceNotFoundError()
      }

      like = await prisma.like.findFirst({
        where: {
          usuarioId: userId,
          postId: post.id
        }
      })
    }
    if (commentPublicId) {
      const comment = await prisma.comment.findUnique({
        where: { public_id: commentPublicId }
      })

      if (!comment) {
        throw new ResourceNotFoundError()
      }

      like = await prisma.like.findFirst({
        where: {
          usuarioId: userId,
          commentId: comment.id
        }
      })
    }

    if (!like) {
      throw new ResourceNotFoundError()
    }

    await prisma.like.delete({
      where: { id: like.id }
    })
  }
}