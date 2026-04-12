import 'dotenv/config'
import { mailer } from './libs/mailer.js'

async function test() {
  await mailer.sendMail({
    to: process.env.EMAIL_USER,
    subject: 'Teste Nodemailer',
    text: 'Funcionou!',
  })

  console.log('Email enviado!')
}

test()