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
  async criarDispositivo(
    @Body() dispositivo: CreateDispositivo,
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
  async atualizarDispositivo(
    @Path() id: number,
    @Body() dispositivo: UpdateDispositivo,
  ): Promise<Dispositivo> {
    return this.controller.atualizarDispositivo(id, dispositivo);
  }

  @Delete("{id}")
  async deletarDispositivo(@Path() id: number): Promise<void> {
    return this.controller.deletarDispositivo(id);
  }
}
