import { hash } from 'bcryptjs'
import { env } from '@/env/index.js'
import { prisma } from '@/libs/prisma.js'

async function seed() {
  await prisma.user.upsert({
    where: { email: 'adminbrabo@exemplo.com' },
    update: {},
    create: {
      public_id: '00000000-0000-0000-0000-000000000001',
      name: 'Admin Brabo',
      email: 'adminbrabo@exemplo.com',
      password: await hash('12345678', env.HASH_SALT_ROUNDS),
      role: 'ADMIN',
    },
  })

  console.log('Database seeded successfully!')
}

seed()
  .then(() => {
    prisma.$disconnect()
    process.exit(0)
  })
  .catch((error) => {
    console.error('Error seeding database:', error)
    prisma.$disconnect()
    process.exit(1)
  })
