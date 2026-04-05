import { prisma } from './libs/prisma.js'

async function main() {
  try {
    const user = await prisma.user.create({
      data: {
        name: 'lucas',
        email: 'lucasduarte@email.com',
        password: '123456',
        photo: null,
      },
    })

    console.log(' Usuário criado com sucesso!')
    console.log(user)

    const users = await prisma.user.findMany()

    console.log('\nUsuários no banco:')
    console.log(users)
  } catch (error) {
    console.error(' Erro:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
