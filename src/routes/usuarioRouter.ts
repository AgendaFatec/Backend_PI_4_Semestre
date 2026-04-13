// src/routes/user/usuariosRouter.ts
import { Route, Tags, Controller, Get, Request, Path, Res, Security } from "tsoa";
import { UsuariosController } from "@/controllers/usuarioController.js";
import { UsuariosService } from "@/services/user/usuariosService.js";
import { PrismaService } from "@/database/database.js";
import type { TsoaResponse } from "tsoa";

@Route("Usuarios")
@Tags("Usuarios")
export class UsuariosRouter extends Controller {
    private readonly usuariosController: UsuariosController;

    constructor() {
        super();
        const prismaService = new PrismaService();
        const usuariosService = new UsuariosService(prismaService);
        this.usuariosController = new UsuariosController(usuariosService);
    }
    @Security("jwt",['ADM','DOCENTE','TI'])
    @Get("me")
    public async getMe(@Request() req: any): Promise<any> {
        return await this.usuariosController.handleGetMe(req.user.sub);
    }


    @Security("jwt",['ADM','DOCENTE','TI'])
    @Get("foto/{userId}")
    public async getFoto(
        @Path() userId: number,
        @Res() notFound: TsoaResponse<404, { msg: string }>
    ): Promise<any> {
        const foto = await this.usuariosController.handleGetPhoto(userId);
        
        if (!foto) {
            return notFound(404, { msg: "Usuário sem foto cadastrada." });
        }

        this.setHeader("Content-Type", "image/jpeg");
        this.setHeader("Cache-Control", "public, max-age=3600"); 
        
        return foto;
    }
}