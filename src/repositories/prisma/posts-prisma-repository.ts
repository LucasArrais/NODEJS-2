import type { Prisma } from '@/@types/prisma/client.js'
import { prisma } from '@/libs/prisma.js'
import type { PostsRepository } from '../posts-repository.js'

export class PrismaPostsRepository implements PostsRepository {
  async create(data: Prisma.PostCreateInput) {
    return prisma.post.create({ data })
  }

  async list() {
    return prisma.post.findMany()
  }

  async findByPublicId(publicId: string) {
    return prisma.post.findUnique({
      where: { public_id: publicId },
      include: {
        usuario: true,
      },
    })
  }

  async findManyByUserId(userId: number) {
    return prisma.post.findMany({
      where: { usuarioId: userId },
    })
  }

  async update(publicId: string, data: Prisma.PostUpdateInput) {
    return prisma.post.update({
      where: { public_id: publicId },
      data,
    })
  }

  async delete(publicId: string) {
    await prisma.post.delete({
      where: { public_id: publicId },
    })
  }

  async findTopLikedPostsInLast24Hours() {
    const twentyFourHoursAgo = new Date()
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24)

    const posts = await prisma.post.findMany({
      where: {
        created_at: {
          gte: twentyFourHoursAgo
        }
      },
      include: {
        usuario: {
          select: {
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            likes: true
          }
        }
      },
      orderBy: {
        likes: {
          _count: 'desc'
        }
      },
      take: 5
    })

    return posts
  }
}