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
  Security,
  Request,
} from "tsoa";
import * as express from "express";
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
  @Security("jwt")
  async criarAgendamento(
    @Body() agendamento: CreateAgendamento,
    @Request() request: express.Request,
  ): Promise<Agendamento> {
    return this.controller.criarAgendamento(agendamento);
  }

  @Post("solicitar-reserva")
  @Security("jwt")
  async solicitarReserva(
    @Body() reserva: SolicitarReserva,
    @Request() request: express.Request,
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
  @Security("jwt")
  async atualizarAgendamento(
    @Path() id: number,
    @Body() agendamento: UpdateAgendamento,
    @Request() request: express.Request,
  ): Promise<Agendamento> {
    return this.controller.atualizarAgendamento(id, agendamento);
  }

  @Post("{id}/aprovar")
  @Security("jwt")
  async aprovarAgendamento(
    @Path() id: number,
    @Request() request: express.Request,
  ): Promise<Agendamento> {
    return this.controller.aprovarAgendamento(id);
  }

  @Post("{id}/cancelar")
  @Security("jwt")
  async cancelarAgendamento(
    @Path() id: number,
    @Request() request: express.Request,
  ): Promise<Agendamento> {
    return this.controller.cancelarAgendamento(id);
  }

  @Delete("{id}")
  @Security("jwt")
  async deletarAgendamento(
    @Path() id: number,
    @Request() request: express.Request,
  ): Promise<void> {
    return this.controller.deletarAgendamento(id);
  }
}
