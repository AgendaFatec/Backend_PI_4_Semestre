import {PrismaService} from "../src/database/database.js"
import { TipoUser, StatusConta } from '@prisma/client'
import 'dotenv/config' // Carrega as variáveis do .env

const prisma = new PrismaService
async function main() {
    const emailAdmin = process.env.EMAIL_SEED;

    if (!emailAdmin) {
    console.error("ERRO: Variável ADMIN_EMAIL não definida no .env");
    return;
    }

  const admin = await prisma.usuario.upsert({
    where: { userEmail: emailAdmin },
    update: {
        tipoUser: TipoUser.ADM, 
        statusUser: StatusConta.ATIVA
    },
    create: {
      userEmail: emailAdmin,
      tipoUser: TipoUser.ADM,
      statusUser: StatusConta.CONVIDADA,
      criadoDate: new Date(),
      adm: {
        create: {}
      }
    },
  })

  console.log(`✅ Seed finalizado! Admin configurado: ${admin.userEmail}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1) 
  })