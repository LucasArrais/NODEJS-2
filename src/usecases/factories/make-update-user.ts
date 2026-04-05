import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { UpdateUserUseCase } from '../users/update-user.js'

export function makeUpdateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const updateUseCase = new UpdateUserUseCase(usersRepository)

  return updateUseCase
}
