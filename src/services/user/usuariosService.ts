// src/services/user/usuariosService.ts
import { PrismaService } from "@/database/database.js";

export class UsuariosService {
    constructor(private prisma: PrismaService) {}

    async getInfoCompleta(userId: number) {
        return await this.prisma.usuario.findUnique({
            where: { userID: userId },
            select: {
                userID: true,
                userNome: true,
                userEmail: true,
                tipoUser: true,
                statusUser: true,
                criadoDate: true,
            }
        });
    }

    async getUserPhoto(userId: number): Promise<Buffer | null> {
        const user = await this.prisma.usuario.findUnique({
            where: { userID: userId },
            select: { fotoUrl: true }
        });

        if (!user || !user.fotoUrl) return null;

        const base64Data = user.fotoUrl.replace(/^data:image\/\w+;base64,/, "");
        return Buffer.from(base64Data, 'base64');
    }
}