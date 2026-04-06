import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Route,
  Body,
  Path,
  Query,
  Tags,
} from "tsoa";
import { AgendamentoService } from "../services/agendamento/agendamentoService.js";
import type {
  Agendamento,
  CreateAgendamento,
  UpdateAgendamento,
  ListarAgendamentoQuery,
  SolicitarReserva,
} from "../interfaces/agendamento/AgendamentoDTO.js";
import { PrismaService } from "../database/database.js";

@Tags("Agendamentos")
@Route("agendamentos")
export class AgendamentoController extends Controller {
  private agendamentoService: AgendamentoService;

  constructor() {
    super();
    const prismaService = new PrismaService();
    this.agendamentoService = new AgendamentoService(prismaService);
  }

  @Post()
  async criarAgendamento(
    @Body() agendamento: CreateAgendamento,
  ): Promise<Agendamento> {
    return await this.agendamentoService.create(agendamento);
  }

  @Post("solicitar-reserva")
  async solicitarReserva(
    @Body() reserva: SolicitarReserva,
  ): Promise<Agendamento> {
    return await this.agendamentoService.create({
      salaId: reserva.salaId,
      dataAgendamento: reserva.dataAgendamento,
      horaInicio: reserva.horaInicio,
      horaFim: reserva.horaFim,
      descricao: reserva.descricao,
    });
  }

  @Get()
  async listarAgendamentos(
    @Query() pagina?: number,
    @Query() limite?: number,
    @Query() salaId?: number,
    @Query() status?: string,
    @Query() dataInicio?: string,
    @Query() dataFim?: string,
  ): Promise<{ data: Agendamento[]; total: number }> {
    return await this.agendamentoService.findAll({
      pagina,
      limite,
      salaId,
      status: status as any,
      dataInicio: dataInicio ? new Date(dataInicio) : undefined,
      dataFim: dataFim ? new Date(dataFim) : undefined,
    });
  }

  @Get("sala/{salaId}")
  async listarAgendamentosPorSala(
    @Path() salaId: number,
    @Query() dataInicio?: string,
    @Query() dataFim?: string,
  ): Promise<Agendamento[]> {
    return await this.agendamentoService.findBySalaId(salaId, {
      dataInicio: dataInicio ? new Date(dataInicio) : undefined,
      dataFim: dataFim ? new Date(dataFim) : undefined,
    });
  }

  @Get("{id}")
  async obterAgendamento(@Path() id: number): Promise<Agendamento | null> {
    return await this.agendamentoService.findById(id);
  }

  @Put("{id}")
  async atualizarAgendamento(
    @Path() id: number,
    @Body() agendamento: UpdateAgendamento,
  ): Promise<Agendamento> {
    return await this.agendamentoService.update(id, agendamento);
  }

  @Post("{id}/aprovar")
  async aprovarAgendamento(@Path() id: number): Promise<Agendamento> {
    return await this.agendamentoService.aprovarAgendamento(id);
  }

  @Post("{id}/cancelar")
  async cancelarAgendamento(@Path() id: number): Promise<Agendamento> {
    return await this.agendamentoService.cancelarAgendamento(id);
  }

  @Delete("{id}")
  async deletarAgendamento(@Path() id: number): Promise<void> {
    return await this.agendamentoService.delete(id);
  }
}
