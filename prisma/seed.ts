import {PrismaService} from "../src/database/database.js"
import { TipoUser, StatusConta } from '@prisma/client'
import 'dotenv/config' // Carrega as variáveis do .env

const prisma = new PrismaService
async function main() {
    const emailAdmin = process.env.EMAIL_ADM_SEED;
    const emailTi = process.env.EMAIL_TI_SEED;
    const emailDocente = process.env.EMAIL_DOCENTE_SEED;

    if (!emailAdmin ) {
    console.error("ERRO: Variável EMAIL_ADM_SEED não definida no .env");
    return;
    }
    if (!emailTi ) {
    console.error("ERRO: Variável EMAIL_TI_SEED não definida no .env");
    return;
    }
    if (!emailDocente ) {
    console.error("ERRO: Variável EMAIL_DOCENTE_SEED não definida no .env");
    return;
    }

  const admin = await prisma.usuario.upsert({
    where: { userEmail: emailAdmin },
    update: {
        tipoUser: TipoUser.ADM, 
        statusUser: StatusConta.CONVIDADA
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
  const ti =await prisma.usuario.upsert({
    where: {userEmail: emailTi},
    update:{
      tipoUser:TipoUser.TI,
      statusUser:StatusConta.CONVIDADA,
    },
    create:{
      userEmail: emailTi,
      tipoUser:TipoUser.TI,
      statusUser:StatusConta.CONVIDADA,
      criadoDate:new Date(),
      ti:{
        create:{}
      }
    }
  })

  const docente =await prisma.usuario.upsert({
    where: {userEmail: emailDocente},
    update:{
      tipoUser:TipoUser.DOCENTE,
      statusUser:StatusConta.CONVIDADA,
    },
    create:{
      userEmail: emailDocente,
      tipoUser:TipoUser.DOCENTE,
      statusUser:StatusConta.CONVIDADA,
      criadoDate:new Date(),
      docente:{
        create:{}
      }
    }
  })


  console.log(` Seed finalizado! Admin configurado: ${admin.userEmail}`)
  console.log(` Seed finalizado! Ti configurado: ${ti.userEmail}`)
  console.log(` Seed finalizado! Docente configurado: ${docente.userEmail}`)
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