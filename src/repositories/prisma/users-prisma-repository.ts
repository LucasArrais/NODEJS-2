import type { Prisma } from '@/@types/prisma/client.js'
import { prisma } from '@/libs/prisma.js'
import type { UsersRepository } from '../users-repository.js'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data })
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    })
  }

  async findByPublicId(publicId: string) {
    return prisma.user.findUnique({
      where: { public_id: publicId },
    })
  }

  async findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        public_id: true,
      },
    })
  }

  async update(publicId: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { public_id: publicId },
      data,
    })
  }

  async delete(publicId: string) {
    await prisma.user.delete({
      where: { public_id: publicId },
    })
  }
}