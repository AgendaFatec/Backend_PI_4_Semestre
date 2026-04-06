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
import { AgendamentoController } from "../controllers/agendamentoController.js";
import type {
  Agendamento,
  CreateAgendamento,
  UpdateAgendamento,
  SolicitarReserva,
} from "../interfaces/agendamento/AgendamentoDTO.js";

@Tags("Agendamentos")
@Route("agendamentos")
export class AgendamentoRouter extends Controller {
  private controller = new AgendamentoController();

  @Post()
  async criarAgendamento(
    @Body() agendamento: CreateAgendamento,
  ): Promise<Agendamento> {
    return this.controller.criarAgendamento(agendamento);
  }

  @Post("solicitar-reserva")
  async solicitarReserva(
    @Body() reserva: SolicitarReserva,
  ): Promise<Agendamento> {
    return this.controller.solicitarReserva(reserva);
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
    return this.controller.listarAgendamentos(
      pagina,
      limite,
      salaId,
      status,
      dataInicio,
      dataFim,
    );
  }

  @Get("sala/{salaId}")
  async listarAgendamentosPorSala(
    @Path() salaId: number,
    @Query() dataInicio?: string,
    @Query() dataFim?: string,
  ): Promise<Agendamento[]> {
    return this.controller.listarAgendamentosPorSala(
      salaId,
      dataInicio,
      dataFim,
    );
  }

  @Get("{id}")
  async obterAgendamento(@Path() id: number): Promise<Agendamento | null> {
    return this.controller.obterAgendamento(id);
  }

  @Put("{id}")
  async atualizarAgendamento(
    @Path() id: number,
    @Body() agendamento: UpdateAgendamento,
  ): Promise<Agendamento> {
    return this.controller.atualizarAgendamento(id, agendamento);
  }

  @Post("{id}/aprovar")
  async aprovarAgendamento(@Path() id: number): Promise<Agendamento> {
    return this.controller.aprovarAgendamento(id);
  }

  @Post("{id}/cancelar")
  async cancelarAgendamento(@Path() id: number): Promise<Agendamento> {
    return this.controller.cancelarAgendamento(id);
  }

  @Delete("{id}")
  async deletarAgendamento(@Path() id: number): Promise<void> {
    return this.controller.deletarAgendamento(id);
  }
}
