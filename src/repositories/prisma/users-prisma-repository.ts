import { prisma } from '@/libs/prisma.js'
import type { Prisma } from "@/@types/prisma/client.js";
import type { UsersRepository } from '@/repositories/users-repository.js';

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    })
    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email }
    })
    return user
  }

  async findBy(where: Prisma.UserWhereInput) {
    const user = await prisma.user.findFirst({
      where
    })
    return user
  }

  async list() {
    const users = await prisma.user.findMany()
    return users
  }

  async delete(publicId: string) {
    await prisma.user.delete({
      where: { public_id: publicId }
    })
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      where: { id },
      data
    })
    return user
  }

  async findByPublicId(publicId: string) {
    const user = await prisma.user.findUnique({
      where: { public_id: publicId }
    })
    return user
  }

  async findById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id }
    })
    return user
  }
}