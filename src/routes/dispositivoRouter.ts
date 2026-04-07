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
import { DispositivoController } from "../controllers/dispositivoController.js";
import type {
  CreateDispositivo,
  UpdateDispositivo,
  Dispositivo,
} from "../interfaces/dispositivo/DispositivoDTO.js";

@Tags("Dispositivos")
@Route("dispositivos")
export class DispositivoRouter extends Controller {
  private controller = new DispositivoController();

  @Post()
  @Security("jwt")
  async criarDispositivo(
    @Body() dispositivo: CreateDispositivo,
    @Request() request: express.Request,
  ): Promise<Dispositivo> {
    return this.controller.criarDispositivo(dispositivo);
  }

  @Get()
  async listarDispositivos(
    @Query() pagina?: number,
    @Query() limite?: number,
    @Query() tipo?: string,
    @Query() status?: string,
    @Query() busca?: string,
  ): Promise<{ data: Dispositivo[]; total: number }> {
    return this.controller.listarDispositivos(
      pagina,
      limite,
      tipo,
      status,
      busca,
    );
  }

  @Get("{id}")
  async obterDispositivo(@Path() id: number): Promise<Dispositivo | null> {
    return this.controller.obterDispositivo(id);
  }

  @Put("{id}")
  @Security("jwt")
  async atualizarDispositivo(
    @Path() id: number,
    @Body() dispositivo: UpdateDispositivo,
    @Request() request: express.Request,
  ): Promise<Dispositivo> {
    return this.controller.atualizarDispositivo(id, dispositivo);
  }

  @Delete("{id}")
  @Security("jwt")
  async deletarDispositivo(
    @Path() id: number,
    @Request() request: express.Request,
  ): Promise<void> {
    return this.controller.deletarDispositivo(id);
  }
}
