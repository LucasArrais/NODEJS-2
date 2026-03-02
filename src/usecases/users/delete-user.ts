import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'
import { UnauthorizedError } from '../errors/unauthorized-error.js'

interface DeleteUserUseCaseRequest {
  publicId: string
  requesterId: string
  requesterRole: 'ADMIN' | 'DEFAULT'
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    publicId,
    requesterId,
    requesterRole,
  }: DeleteUserUseCaseRequest): Promise<void> {

    const user = await this.usersRepository.findByPublicId(publicId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    if (
      requesterRole !== 'ADMIN' &&
      requesterId !== publicId
    ) {
      throw new UnauthorizedError()
    }

    await this.usersRepository.delete(publicId)
  }
}