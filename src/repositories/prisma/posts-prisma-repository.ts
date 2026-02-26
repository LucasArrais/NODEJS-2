import type { Prisma } from '@/@types/prisma/client.js'
import type { PostsRepository } from '../posts-repository.js'
import { prisma } from '@/libs/prisma.js'

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
}