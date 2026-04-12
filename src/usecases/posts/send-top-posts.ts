import type { PostsRepository } from '@/repositories/posts-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { mailer } from '@/libs/mailer.js'

interface TopPost {
  titulo: string
  conteudo: string
  likesCount: number
  autorNome: string
}

export class SendTopPostsUseCase {
  constructor(
    private postsRepository: PostsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute() {
    const topPosts = await this.postsRepository.findTopLikedPostsInLast24Hours()
    
    if (topPosts.length === 0) {
      console.log('[DIGEST] Nenhum post encontrado nas últimas 24h')
      return
    }

    const users = await this.usersRepository.findAll()
    
    const postsFormatted: TopPost[] = topPosts.map(post => ({
      titulo: post.titulo,
      conteudo: post.conteudo.substring(0, 150) + '...',
      likesCount: post._count.likes,
      autorNome: post.usuario.name
    }))

    for (const user of users) {
      await this.sendDigestEmail(user.email, user.name, postsFormatted)
    }
    
    console.log(`[DIGEST] Email enviado para ${users.length} usuários`)
  }

  private async sendDigestEmail(to: string, userName: string, topPosts: TopPost[]) {
    const html = this.generateEmailHTML(userName, topPosts)
    
    await mailer.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: 'Resumo dos Posts Mais Curtidos das Últimas 24h',
      html
    })
  }

  private generateEmailHTML(userName: string, topPosts: TopPost[]): string {
    const postsHtml = topPosts.map(post => `
      <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px;">
        <h3 style="color: #333;">${post.titulo}</h3>
        <p style="color: #666;">${post.conteudo}</p>
        <div style="display: flex; gap: 15px; font-size: 14px; color: #888;">
          <span>${post.autorNome}</span>
          <span>${post.likesCount} curtidas</span>
        </div>
      </div>
    `).join('')

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f4f4f4; padding: 20px; text-align: center; border-radius: 8px; }
          .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Olá, ${userName}!</h2>
            <p>Confira os posts mais curtidos nas últimas 24 horas</p>
          </div>
          
          ${postsHtml}
          
          <div class="footer">
            <p>Este é um resumo automático enviado pelo nosso sistema.</p>
            <p>Você recebe este email porque está cadastrado em nossa plataforma.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }
}