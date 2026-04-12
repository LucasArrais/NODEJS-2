import bcrypt from 'bcrypt'
import { prisma } from '../../libs/prisma.js'

export class ResetPasswordUseCase {
  async execute({
    token,
    password,
  }: {
    token: string
    password: string
  }) {
    const user = await prisma.user.findFirst({
      where: { resetToken: token },
    })

    if (!user) {
      throw new Error('Token inválido')
    }

    if (!user.resetTokenExpires || user.resetTokenExpires < new Date()) {
      throw new Error('Token expirado')
    }

    const hash = await bcrypt.hash(
      password,
      Number(process.env.HASH_SALT_ROUNDS)
    )

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hash,
        resetToken: null,
        resetTokenExpires: null,
      },
    })
  }
}