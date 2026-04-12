Clone o repositório e instale as dependências:

```bash
npm install
cp .env.example .env - PREENCHA AS VARIAVEIS do .env
docker-compose up -d
npx prisma generate
npx prisma migrate dev
npm run start:dev