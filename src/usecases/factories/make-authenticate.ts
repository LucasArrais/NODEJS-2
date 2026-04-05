export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()

  return new AuthenticateUserUseCase(usersRepository)
}

import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { AuthenticateUserUseCase } from '../users/authenticate.js'
