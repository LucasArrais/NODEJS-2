import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { RegisterUserUseCase } from '../users/register.js'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUserUseCase = new RegisterUserUseCase(usersRepository)

  return registerUserUseCase
}
