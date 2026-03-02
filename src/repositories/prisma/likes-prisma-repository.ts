import { prisma } from '@/libs/prisma.js'
import type { Prisma, Like } from '@/@types/prisma/client.js'
import type { LikesRepository } from '../likes-repository.js'

export class PrismaLikesRepository implements LikesRepository {

  async create(data: Prisma.LikeUncheckedCreateInput): Promise<Like> {
    return prisma.like.create({
      data,
    })
  }

  async findByPublicId(publicId: string): Promise<Like | null> {
    return prisma.like.findUnique({
      where: { public_id: publicId },
    })
  }

  async findByUserAndTarget(
    userId: number,
    postId?: number,
    commentId?: number
  ): Promise<Like | null> {
    return prisma.like.findFirst({
      where: {
        usuarioId: userId,
        postId: postId ?? undefined,
        commentId: commentId ?? undefined,
      },
    })
  }

  async listByUser(userId: number): Promise<Like[]> {
    return prisma.like.findMany({
      where: { usuarioId: userId },
    })
  }

  async listByPost(postId: number): Promise<Like[]> {
    return prisma.like.findMany({
      where: { postId },
    })
  }

  async listByComment(commentId: number): Promise<Like[]> {
    return prisma.like.findMany({
      where: { commentId },
    })
  }

  async delete(publicId: string): Promise<void> {
    await prisma.like.delete({
      where: { public_id: publicId },
    })
  }
}