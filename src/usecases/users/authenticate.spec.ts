import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AuthenticateUserUseCase } from './authenticate.js'
import type { UsersRepository } from '@/repositories/users-repository.js'

vi.mock('bcrypt', () => ({
  compare: vi.fn(),
}))

import { compare } from 'bcrypt'

describe('AuthenticateUserUseCase', () => {
  let usersRepository: UsersRepository
  let sut: AuthenticateUserUseCase

  beforeEach(() => {
    usersRepository = {
      findByEmail: vi.fn(),
      create: vi.fn(),
      findByPublicId: vi.fn(),
      findAll: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    }

    sut = new AuthenticateUserUseCase(usersRepository)
  })

  it('deve retornar um token quando o email e a senha estiverem corretos', async () => {
    const mockUser = {
      id: 1,
      public_id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hash-senha-fake',
      created_at: new Date(),
      updated_at: new Date(),
    }

    vi.mocked(usersRepository.findByEmail).mockResolvedValue(mockUser)
    vi.mocked(compare).mockResolvedValue(true as any)

    const result = await sut.execute({
      login: 'john@example.com',
      password: 'senha-correta',
    })

    expect(result.user).toEqual(
      expect.objectContaining({
        email: 'john@example.com',
        public_id: 'user-1',
      })
    )
    expect(usersRepository.findByEmail).toHaveBeenCalledWith('john@example.com')
    expect(compare).toHaveBeenCalledWith('senha-correta', 'hash-senha-fake')
  })
})