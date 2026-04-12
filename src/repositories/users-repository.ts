import type { Prisma } from '@/@types/prisma/client.js'

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<any>
  findByEmail(email: string): Promise<any>
  findByPublicId(publicId: string): Promise<any>
  findAll(): Promise<Array<{
    id: number
    name: string
    email: string
    public_id: string
  }>>
  update(publicId: string, data: Prisma.UserUpdateInput): Promise<any>
  delete(publicId: string): Promise<void>
}