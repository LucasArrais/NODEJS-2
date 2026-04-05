import type { User } from '@/@types/prisma/client.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface GetUserUseCaseRequest {
  publicId: string
}

type GetUserUseCaseResponse = {
  user: User
}

export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    publicId,
  }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const user = await this.usersRepository.findBy({ public_id: publicId })

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
