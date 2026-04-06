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
import { TecnologiaService } from "../services/tecnologia/tecnologiaService.js";
import * as TecnologiaDTOs from "../interfaces/tecnologia/TecnologiaDTO.js";
import { PrismaService } from "../database/database.js";

@Tags("Tecnologias")
@Route("tecnologias")
export class TecnologiaController extends Controller {
  private tecnologiaService: TecnologiaService;

  constructor() {
    super();
    const prismaService = new PrismaService();
    this.tecnologiaService = new TecnologiaService(prismaService);
  }

  @Post()
  async criarTecnologia(
    @Body() tecnologia: TecnologiaDTOs.CreateTecnologia,
  ): Promise<TecnologiaDTOs.Tecnologia> {
    return await this.tecnologiaService.create(tecnologia);
  }

  @Get()
  async listarTecnologias(
    @Query() pagina?: number,
    @Query() limite?: number,
    @Query() busca?: string,
  ): Promise<{ data: TecnologiaDTOs.Tecnologia[]; total: number }> {
    return await this.tecnologiaService.findAll({
      pagina,
      limite,
      busca,
    });
  }

  @Get("{id}")
  async obterTecnologia(
    @Path() id: number,
  ): Promise<TecnologiaDTOs.Tecnologia | null> {
    return await this.tecnologiaService.findById(id);
  }

  @Put("{id}")
  async atualizarTecnologia(
    @Path() id: number,
    @Body() tecnologia: TecnologiaDTOs.UpdateTecnologia,
  ): Promise<TecnologiaDTOs.Tecnologia> {
    return await this.tecnologiaService.update(id, tecnologia);
  }

  @Delete("{id}")
  async deletarTecnologia(@Path() id: number): Promise<void> {
    return await this.tecnologiaService.delete(id);
  }
}
