import { prisma } from '@/libs/prisma.js'
import bcrypt from 'bcrypt'

async function createRecentTestData() {
  const password = await bcrypt.hash('123456', 10)

  const user1 = await prisma.user.upsert({
    where: { email: 'joao@teste.com' },
    update: {},
    create: {
      name: 'João Silva',
      email: 'joao@teste.com',
      password,
      role: 'DEFAULT'
    }
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'maria@teste.com' },
    update: {},
    create: {
      name: 'Maria Santos',
      email: 'maria@teste.com',
      password,
      role: 'DEFAULT'
    }
  })

  const now = new Date()
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)

  const post1 = await prisma.post.create({
    data: {
      titulo: 'Aprendendo Node.js com TypeScript',
      conteudo: 'Neste artigo vou mostrar como configurar um projeto Node.js usando TypeScript, Prisma e Fastify. É uma stack incrível para desenvolvimento backend!',
      usuarioId: user1.id,
      created_at: oneHourAgo
    }
  })

  const post2 = await prisma.post.create({
    data: {
      titulo: 'Clean Architecture na prática',
      conteudo: 'Separação de responsabilidades é fundamental. Aprendi que usar UseCases e Repositories isolados facilita muito a manutenção do código.',
      usuarioId: user2.id,
      created_at: oneHourAgo
    }
  })

  const post3 = await prisma.post.create({
    data: {
      titulo: 'Dicas para entrevistas técnicas',
      conteudo: 'Prepare-se estudando algoritmos, estrutura de dados e pratique muito system design. A confiança faz toda diferença!',
      usuarioId: user1.id,
      created_at: now
    }
  })

  await prisma.like.create({
    data: {
      usuarioId: user1.id,
      postId: post2.id
    }
  })

  await prisma.like.create({
    data: {
      usuarioId: user2.id,
      postId: post1.id
    }
  })

  await prisma.like.create({
    data: {
      usuarioId: user1.id,
      postId: post1.id
    }
  })

  await prisma.like.create({
    data: {
      usuarioId: user2.id,
      postId: post3.id
    }
  })

  console.log('Posts recentes criados com sucesso:')
  console.log(`- ${post1.titulo} (${post1.created_at})`)
  console.log(`- ${post2.titulo} (${post2.created_at})`)
  console.log(`- ${post3.titulo} (${post3.created_at})`)
}

createRecentTestData()
  .catch(console.error)
  .finally(() => prisma.$disconnect())