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
import { DispositivoService } from "../services/dispositivo/dispositivoService.js";
import type {
  CreateDispositivo,
  UpdateDispositivo,
  Dispositivo,
  ListarDispositivoQuery,
} from "../interfaces/dispositivo/DispositivoDTO.js";
import { PrismaService } from "../database/database.js";

@Tags("Dispositivos")
@Route("dispositivos")
export class DispositivoController extends Controller {
  private dispositivoService: DispositivoService;

  constructor() {
    super();
    const prismaService = new PrismaService();
    this.dispositivoService = new DispositivoService(prismaService);
  }

  @Post()
  async criarDispositivo(
    @Body() dispositivo: CreateDispositivo,
  ): Promise<Dispositivo> {
    return await this.dispositivoService.create(dispositivo);
  }

  @Get()
  async listarDispositivos(
    @Query() pagina?: number,
    @Query() limite?: number,
    @Query() tipo?: string,
    @Query() status?: string,
    @Query() busca?: string,
  ): Promise<{ data: Dispositivo[]; total: number }> {
    return await this.dispositivoService.findAll({
      pagina,
      limite,
      tipo: tipo as any,
      status: status as any,
      busca,
    });
  }

  @Get("{id}")
  async obterDispositivo(@Path() id: number): Promise<Dispositivo | null> {
    return await this.dispositivoService.findById(id);
  }

  @Put("{id}")
  async atualizarDispositivo(
    @Path() id: number,
    @Body() dispositivo: UpdateDispositivo,
  ): Promise<Dispositivo> {
    return await this.dispositivoService.update(id, dispositivo);
  }

  @Delete("{id}")
  async deletarDispositivo(@Path() id: number): Promise<void> {
    return await this.dispositivoService.delete(id);
  }
}
