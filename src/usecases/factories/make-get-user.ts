import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { GetUserUseCase } from '../users/get-user.js'

export function makeGetUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const GetUseCase = new GetUserUseCase(usersRepository)

  return GetUseCase
}
