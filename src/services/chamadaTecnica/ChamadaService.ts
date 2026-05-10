import { PrismaService } from "@/database/database.js";
import { CreateChamadaRequest, UpdateStatusRequest } from "@/interfaces/chamada/ChamadaDTO.js";

export class ChamadaService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateChamadaRequest) {
    return await this.prisma.chamadaTecnica.create({
      data: {
        salaId: data.salaId,
        usuarioId: data.usuarioId,
        dispositivoId: data.dispositivoId,
        tipoProblema: data.tipoProblema,
        descricao: data.descricao,
        anexos: data.anexos,
      }
    });
  }

  async listAll(status?: any) {
    return await this.prisma.chamadaTecnica.findMany({
      where: status ? { status } : {},
      include: {
        sala: true,
        usuario: true,
        dispositivo: true
      },
      orderBy: { dataChamada: 'desc' }
    });
  }

  async updateStatus(id: number, data: UpdateStatusRequest) {
    return await this.prisma.chamadaTecnica.update({
      where: { idChamada: id },
      data: {
        status: data.status,
        tecnicoId: data.tecnicoId,
        acoesRealizadas: data.acoesRealizadas,
        dataResposta: data.status === 'RESOLVIDO' ? new Date() : null
      }
    });
  }
}