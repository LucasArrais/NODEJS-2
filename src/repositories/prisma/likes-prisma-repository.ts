import type { Prisma } from '@/@types/prisma/client.js'
import { prisma } from '@/libs/prisma.js'
import type {
  FindByUserAndTargetParams,
  LikesRepository,
} from '../likes-repository.js'

export class PrismaLikesRepository implements LikesRepository {
  async create(data: Prisma.LikeCreateInput) {
    return prisma.like.create({ data })
  }

  async findByUserAndTarget({
    userId,
    postId,
    commentId,
  }: FindByUserAndTargetParams) {
    return prisma.like.findFirst({
      where: {
        usuarioId: userId,
        ...(postId !== undefined && { postId }),
        ...(commentId !== undefined && { commentId }),
      },
    })
  }

  async findManyByPostId(postId: number) {
    return prisma.like.findMany({
      where: { postId },
      include: {
        usuario: true,
      },
    })
  }

  async findManyByCommentId(commentId: number) {
    return prisma.like.findMany({
      where: { commentId },
      include: {
        usuario: true,
      },
    })
  }

  async findManyByUserId(userId: number) {
    return prisma.like.findMany({
      where: { usuarioId: userId },
      include: {
        post: true,
        comment: true,
      },
    })
  }

  async delete(id: number) {
    await prisma.like.delete({
      where: { id },
    })
  }

  async deleteByUserAndTarget({
    userId,
    postId,
    commentId,
  }: FindByUserAndTargetParams) {
    await prisma.like.deleteMany({
      where: {
        usuarioId: userId,
        ...(postId !== undefined && { postId }),
        ...(commentId !== undefined && { commentId }),
      },
    })
  }
}
