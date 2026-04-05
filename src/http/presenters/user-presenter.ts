import type { User } from '@/@types/prisma/client.js'

type HTTPUser = {
  id: number // mudou de string para number
  public_id: string // adicionou public_id
  name: string
  email: string
  photo: string | null
  role: string
}

export class UserPresenter {
  static toHTTP(user: User): HTTPUser
  static toHTTP(user: User[]): HTTPUser[]
  static toHTTP(input: User | User[]): HTTPUser | HTTPUser[] {
    if (Array.isArray(input)) {
      return input.map((user) => UserPresenter.toHTTP(user))
    }
    return {
      id: input.id, // id numérico do banco
      public_id: input.public_id, // uuid
      name: input.name,
      email: input.email,
      photo: input.photo,
      role: input.role,
    }
  }
}
