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
import { InventarioService } from "../services/inventario/inventarioService.js";
import type {
  Inventario,
  CreateInventario,
  UpdateInventario,
  ListarInventarioQuery,
  ListarInventarioComBusca,
  SalasComInventario,
} from "../interfaces/inventario/InventarioDTO.js";
import { PrismaService } from "../database/database.js";

@Tags("Inventários")
@Route("inventarios")
export class InventarioController extends Controller {
  private inventarioService: InventarioService;

  constructor() {
    super();
    const prismaService = new PrismaService();
    this.inventarioService = new InventarioService(prismaService);
  }

  @Post()
  async criarInventario(
    @Body() inventario: CreateInventario,
  ): Promise<Inventario> {
    return await this.inventarioService.create(inventario);
  }

  @Get()
  async listarInventarios(
    @Query() pagina?: number,
    @Query() limite?: number,
    @Query() status?: string,
    @Query() Search_Sala?: string,
  ): Promise<{ data: Inventario[]; total: number }> {
    return await this.inventarioService.findAll({
      pagina,
      limite,
      status: status as any,
      Search_Sala,
    });
  }

  @Get("busca/palavraChave")
  async buscaPorPalavraChave(
    @Query() busca: string,
    @Query() pagina?: number,
    @Query() limite?: number,
  ): Promise<{ data: SalasComInventario[]; total: number }> {
    return await this.inventarioService.buscarPorPalavraChave(busca, {
      pagina,
      limite,
    });
  }

  @Get("sala/{salaId}")
  async obterInventarioPorSala(
    @Path() salaId: number,
  ): Promise<Inventario | null> {
    return await this.inventarioService.findBySalaId(salaId);
  }

  @Get("{id}")
  async obterInventario(@Path() id: number): Promise<Inventario | null> {
    return await this.inventarioService.findById(id);
  }

  @Put("{id}")
  async atualizarInventario(
    @Path() id: number,
    @Body() inventario: UpdateInventario,
  ): Promise<Inventario> {
    return await this.inventarioService.update(id, inventario);
  }

  @Delete("{id}")
  async deletarInventario(@Path() id: number): Promise<void> {
    return await this.inventarioService.delete(id);
  }
}
