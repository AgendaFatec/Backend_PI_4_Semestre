import { ChamadaService } from "@/services/chamadaTecnica/ChamadaService.js";
import { PrismaService } from "../database/database.js";
import type{ UpdateStatusRequest,CreateChamadaRequest } from "@/interfaces/chamada/ChamadaDTO.js";


export class ChamadaController {
  private service: ChamadaService;
  constructor() {
    this.service = new ChamadaService(new PrismaService());
  }
  async abrirChamado(body: CreateChamadaRequest) {
    return await this.service.create(body);
  }
  async listar(status?: string) {
    return await this.service.listAll(status);
  }

  async atualizar(id: number, body: UpdateStatusRequest) {
    return await this.service.updateStatus(id, body);
  }
}