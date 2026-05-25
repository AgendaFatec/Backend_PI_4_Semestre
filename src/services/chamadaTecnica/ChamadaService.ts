import { PrismaService } from "@/database/database.js";
import {
  CreateChamadaRequest,
  UpdateStatusRequest,
} from "@/interfaces/chamada/ChamadaDTO.js";

export class ChamadaService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateChamadaRequest) {
    const {
      salaId,
      usuarioId,
      dispositivoId,
      dispositivo,
      tipoProblema,
      descricao = "",
      anexos,
      tecnologias,
      patrimonio,
    } = data;

    const createData: any = {
      salaId,
      usuarioId,
      dispositivoId,
      tipoProblema,
      descricao,
      anexos,
      dispositivoNome: dispositivo ?? null,
      patrimonio: patrimonio ?? null,
    };

    if (tipoProblema === "Software" && tecnologias?.length) {
      createData.tecnologias = {
        create: tecnologias.map((tecnologia) => ({
          nome: tecnologia.nome,
          versao: tecnologia.versao,
        })),
      };
    }

    return await this.prisma.chamadaTecnica.create({
      data: createData,
    });
  }

  async listAll(status?: any) {
    return await this.prisma.chamadaTecnica.findMany({
      where: status ? { status } : {},
      include: {
        sala: true,
        usuario: true,
        dispositivo: true,
      },
      orderBy: { dataChamada: "desc" },
    });
  }

  async listByUsuario(usuarioId: number, status?: any) {
    return await this.prisma.chamadaTecnica.findMany({
      where: Object.assign({ usuarioId }, status ? { status } : {}),
      include: {
        sala: true,
        usuario: true,
        dispositivo: true,
        tecnologias: true,
      },
      orderBy: { dataChamada: "desc" },
    });
  }

  async updateStatus(id: number, data: UpdateStatusRequest) {
    return await this.prisma.chamadaTecnica.update({
      where: { idChamada: id },
      data: {
        status: data.status,
        tecnicoId: data.tecnicoId,
        acoesRealizadas: data.acoesRealizadas,
        dataResposta: data.status === "RESOLVIDO" ? new Date() : null,
      },
    });
  }
}
