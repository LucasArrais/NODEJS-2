import type { User } from '@/@types/prisma/client.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'
import { UnauthorizedError } from '../errors/unauthorized-error.js'
import { hash } from 'bcryptjs'

interface UpdateUserUseCaseRequest {
  userPublicId: string
  requesterId: string
  requesterRole: 'ADMIN' | 'DEFAULT'
  name?: string
  email?: string
  password?: string
  photo?: string | null
}

type UpdateUserUseCaseResponse = {
  user: User
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userPublicId,
    requesterId,
    requesterRole,
    name,
    email,
    password,
    photo,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {

    const userToUpdate = await this.usersRepository.findByPublicId(userPublicId)

    if (!userToUpdate) {
      throw new ResourceNotFoundError()
    }

    if (requesterRole !== 'ADMIN' && userToUpdate.public_id !== requesterId) {
      throw new UnauthorizedError()
    }

    const updateData: any = {}
    
    if (name !== undefined) updateData.name = name
    if (email !== undefined) updateData.email = email
    if (photo !== undefined) updateData.photo = photo
    
    if (password !== undefined) {
      updateData.password = await hash(password, 6)
    }

    if (Object.keys(updateData).length === 0) {
      return { user: userToUpdate }
    }

    const updatedUser = await this.usersRepository.update(userToUpdate.id, updateData)

    return { user: updatedUser }
  }
}