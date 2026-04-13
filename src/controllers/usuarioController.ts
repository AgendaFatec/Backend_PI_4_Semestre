// src/controllers/usuarioController.ts
import { UsuariosService } from "@/services/user/usuariosService.js";

export class UsuariosController {
    constructor(private usuariosService: UsuariosService) {}

    async handleGetMe(userId: number) {
        const user = await this.usuariosService.getInfoCompleta(userId);
        if (!user) throw new Error("Usuário não encontrado.");
        return user;
    }

    async handleGetPhoto(userId: number) {
        return await this.usuariosService.getUserPhoto(userId);
    }
}