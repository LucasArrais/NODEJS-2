import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { DeleteUserUseCase } from '../users/delete-user.js'

export function makeDeleteUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const deleteUseCase = new DeleteUserUseCase(usersRepository)

  return deleteUseCase
}
