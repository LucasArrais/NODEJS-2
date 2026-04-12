import crypto from 'crypto'
import { mailer } from '../../libs/mailer.js'
import { prisma } from '../../libs/prisma.js'

export class SendRecoverPasswordUseCase {
  async execute({ email }: { email: string }) {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) return

    const token = crypto.randomBytes(32).toString('hex')

    const expires = new Date(Date.now() + 1000 * 60 * 15)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        resetTokenExpires: expires,
      },
    })

    const link = `${process.env.BASE_URL}/reset-password/${token}`

    await mailer.sendMail({
      to: user.email,
      subject: 'Recuperação de senha',
      html: `
        <h2>Recuperação de senha</h2>
        <p>Clique no link abaixo:</p>
        <a href="${link}">Resetar senha</a>
      `,
    })
  }
}