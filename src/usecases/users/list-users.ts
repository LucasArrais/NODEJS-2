import type { UsersRepository } from '@/repositories/users-repository.js'

type ListUserUseCaseResponse = {
  users: Array<{
    id: number
    name: string
    email: string
    public_id: string
  }>
}

export class ListUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute(): Promise<ListUserUseCaseResponse> {
    const users = await this.usersRepository.findAll()

    return { users }
  }
}