import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface DeleteUserUseCaseRequest {
  userPublicId: string
  requesterId: string
  requesterRole: 'ADMIN' | 'DEFAULT'
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userPublicId,
    requesterId,
    requesterRole,
  }: DeleteUserUseCaseRequest): Promise<void> {
    const user = await this.usersRepository.findByPublicId(userPublicId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    if (requesterRole !== 'ADMIN' && requesterId !== userPublicId) {
      const { UnauthorizedError } = await import(
        '../errors/unauthorized-error.js'
      )
      throw new UnauthorizedError()
    }

    await this.usersRepository.delete(userPublicId)
  }
}
