import { PrismaService } from "../src/database/database.js"
import { TipoUser, StatusConta, TipoSala, DispositvoTipo } from '@prisma/client'
import 'dotenv/config' 

const prisma = new PrismaService()

async function main() {
  const emailAdmin = process.env.EMAIL_ADM_SEED;
  const emailTi = process.env.EMAIL_TI_SEED;
  const emailDocente = process.env.EMAIL_DOCENTE_SEED;

  if (!emailAdmin) {
    console.error("ERRO: Variável EMAIL_ADM_SEED não definida no .env");
    return;
  }
  if (!emailTi) {
    console.error("ERRO: Variável EMAIL_TI_SEED não definida no .env");
    return;
  }
  if (!emailDocente) {
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
      adm: { create: {} }
    },
  })
  
  const ti = await prisma.usuario.upsert({
    where: { userEmail: emailTi },
    update: {
      tipoUser: TipoUser.TI,
      statusUser: StatusConta.CONVIDADA,
    },
    create: {
      userEmail: emailTi,
      tipoUser: TipoUser.TI,
      statusUser: StatusConta.CONVIDADA,
      criadoDate: new Date(),
      ti: { create: {} }
    }
  })

  const docente = await prisma.usuario.upsert({
    where: { userEmail: emailDocente },
    update: {
      tipoUser: TipoUser.DOCENTE,
      statusUser: StatusConta.CONVIDADA,
    },
    create: {
      userEmail: emailDocente,
      tipoUser: TipoUser.DOCENTE,
      statusUser: StatusConta.CONVIDADA,
      criadoDate: new Date(),
      docente: { create: {} }
    }
  })

  console.log(`✅ Seed finalizado! Admin configurado: ${admin.userEmail}`)
  console.log(`✅ Seed finalizado! Ti configurado: ${ti.userEmail}`)
  console.log(`✅ Seed finalizado! Docente configurado: ${docente.userEmail}`)

  console.log("🛠️ Gerando dados da Sala 30 para testes de Frontend...");

  let sala30 = await prisma.sala.findFirst({ where: { nomeSala: 'Sala 30' } });
  if (!sala30) {
    sala30 = await prisma.sala.create({
      data: {
        nomeSala: 'Sala 30',
        tipoSala: TipoSala.COMUN,
        disponibilidadeSala: true,
        qtdeSala: 1,
        capacidadeAlunos: 30,
      }
    });
  }

  let inventario = await prisma.inventario.findUnique({ where: { salaId: sala30.idSala } });
  if (!inventario) {
    inventario = await prisma.inventario.create({
      data: { salaId: sala30.idSala }
    });
  }

  const excel = await prisma.tecnologia.upsert({
    where: { nomeTecnologia: 'Excel' },
    update: {},
    create: { nomeTecnologia: 'Excel', descricao: 'Microsoft Excel' }
  });

  let pc = await prisma.dispositivo.findFirst({ where: { nomeDispositivo: 'Computador Positivo' } });
  if (!pc) {
    pc = await prisma.dispositivo.create({
      data: {
        nomeDispositivo: 'Computador Positivo',
        tipoDispositivo: DispositvoTipo.DESKTOP,
        patrimonio: 'PC001', 
      }
    });
  }

  await prisma.inventarioTecnologia.upsert({
    where: {
      inventarioId_tecnologiaId: {
        inventarioId: inventario.idInventario,
        tecnologiaId: excel.idTecnologia
      }
    },
    update: {},
    create: {
      inventarioId: inventario.idInventario,
      tecnologiaId: excel.idTecnologia
    }
  });

  await prisma.inventarioDispositivo.upsert({
    where: {
      inventarioId_dispositivoId: {
        inventarioId: inventario.idInventario,
        dispositivoId: pc.idDispositivo
      }
    },
    update: { quantidade: 30 },
    create: {
      inventarioId: inventario.idInventario,
      dispositivoId: pc.idDispositivo,
      quantidade: 30
    }
  });

  console.log("✅ Sala 30, máquinas e tecnologias vinculadas e salvas com sucesso!");
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