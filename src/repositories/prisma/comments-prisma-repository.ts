import { prisma } from '@/libs/prisma.js'
import type { Prisma, Comment } from '@/@types/prisma/client.js'
import type { CommentsRepository } from '../comments-repository.js'

export class PrismaCommentsRepository implements CommentsRepository {

  async create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment> {
    return prisma.comment.create({
      data,
    })
  }

  async findByPublicId(publicId: string): Promise<Comment | null> {
    return prisma.comment.findUnique({
      where: { public_id: publicId },
    })
  }

  async findByPublicIdWithUser(
    publicId: string
  ): Promise<(Comment & { usuario: { public_id: string } }) | null> {
    return prisma.comment.findUnique({
      where: { public_id: publicId },
      include: {
        usuario: {
          select: {
            public_id: true,
          },
        },
      },
    })
  }

  async list(): Promise<Comment[]> {
    return prisma.comment.findMany()
  }

  async listByUser(userId: number): Promise<Comment[]> {
    return prisma.comment.findMany({
      where: { usuarioId: userId },
    })
  }

  async listByPost(postId: number): Promise<Comment[]> {
    return prisma.comment.findMany({
      where: { postId },
    })
  }

  async update(
    publicId: string,
    data: Prisma.CommentUpdateInput
  ): Promise<Comment> {
    return prisma.comment.update({
      where: { public_id: publicId },
      data,
    })
  }

  async delete(publicId: string): Promise<void> {
    await prisma.comment.delete({
      where: { public_id: publicId },
    })
  }

  async listWithRelations(page: number) {
  return prisma.comment.findMany({
    orderBy: {
      created_at: 'desc',
    },
    take: 10,
    skip: (page - 1) * 10,
    select: {
      public_id: true,
      conteudo: true,
      created_at: true,
      usuario: {
        select: {
          public_id: true,
          name: true,
        },
      },
      post: {
        select: {
          public_id: true,
        },
      },
    },
  })
}
}