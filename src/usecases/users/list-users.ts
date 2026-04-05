import type { User } from '@/@types/prisma/client.js'
import type { UsersRepository } from '@/repositories/users-repository.js'

type ListUserUseCaseResponse = {
  users: User[]
}

export class ListUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute(): Promise<ListUserUseCaseResponse> {
    const users = await this.usersRepository.list()

    return { users }
  }
}
