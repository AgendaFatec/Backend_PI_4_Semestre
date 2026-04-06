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
import { TecnologiaController } from "../controllers/tecnologiaController.js";
import * as TecnologiaDTOs from "../interfaces/tecnologia/TecnologiaDTO.js";

@Tags("Tecnologias")
@Route("tecnologias")
export class TecnologiaRouter extends Controller {
  private controller = new TecnologiaController();

  @Post()
  async criarTecnologia(
    @Body() tecnologia: TecnologiaDTOs.CreateTecnologia,
  ): Promise<TecnologiaDTOs.Tecnologia> {
    return this.controller.criarTecnologia(tecnologia);
  }

  @Get()
  async listarTecnologias(
    @Query() pagina?: number,
    @Query() limite?: number,
    @Query() busca?: string,
  ): Promise<{ data: TecnologiaDTOs.Tecnologia[]; total: number }> {
    return this.controller.listarTecnologias(pagina, limite, busca);
  }

  @Get("{id}")
  async obterTecnologia(
    @Path() id: number,
  ): Promise<TecnologiaDTOs.Tecnologia | null> {
    return this.controller.obterTecnologia(id);
  }

  @Put("{id}")
  async atualizarTecnologia(
    @Path() id: number,
    @Body() tecnologia: TecnologiaDTOs.UpdateTecnologia,
  ): Promise<TecnologiaDTOs.Tecnologia> {
    return this.controller.atualizarTecnologia(id, tecnologia);
  }

  @Delete("{id}")
  async deletarTecnologia(@Path() id: number): Promise<void> {
    return this.controller.deletarTecnologia(id);
  }
}
