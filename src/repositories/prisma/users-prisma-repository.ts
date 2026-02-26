import type { Prisma } from '@/@types/prisma/client.js'
import type { UsersRepository } from '../users-repository.js'
import { prisma } from '@/libs/prisma.js'

export class PrismaUsersRepository implements UsersRepository {

  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({ data })
  }

  async findByEmail(email: string) {
    return await prisma.user.findFirst({
      where: { email },
    })
  }

  async findBy(where: Prisma.UserWhereInput) {
    return await prisma.user.findFirst({
      where,
    })
  }

  async list(){
    return await prisma.user.findMany()
  }

  async delete(publicId: string) {
  await prisma.user.delete({
    where: { public_id: publicId },
  })
}
  async update(id: number, data: Prisma.UserUpdateInput) {
    return await prisma.user.update({
      where: { id },
      data,
    })
}

  async findByPublicId(publicId: string) {
    return prisma.user.findUnique({
      where: { public_id: publicId },
  })
}

}