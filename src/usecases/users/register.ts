import { hash } from 'bcryptjs'
import type { User } from '@/@types/prisma/client.js'
import { env } from '@/env/index.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { UserAlrealdyExistsError } from '../errors/user-already-exists-error.js'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
  photo?: string | null
}

type RegisterUserUseCaseResponse = {
  user: User
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    name,
    email,
    password,
    photo,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlrealdyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: await hash(password, env.HASH_SALT_ROUNDS),
      photo: photo ?? null,
    })

    return { user }
  }
}
