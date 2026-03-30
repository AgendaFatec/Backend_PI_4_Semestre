import { Profile } from "passport";
import { PrismaService } from "@/database/database.js";
import {TipoUser as PrismaTipoUser, StatusConta} from "@prisma/client"
import { omit } from "zod/mini";
import { NewUser } from "@/interfaces/coordenacao/Coordenacao.js"; 


export class CoordenadorService{
    constructor(private prisma: PrismaService){}

    async createNewUser(newUser: NewUser){
        const userData = await this.prisma.usuario.create({
            data:{
                userEmail: newUser.email,
                tipoUser: newUser.tipoUser,
                criadoDate: newUser.dataCriacao,
                statusUser: newUser.statusConta
            }
        })
        // console.log(`\n\n\n userData: \n ${userData}\n\n`)
        const user:NewUser = {
            email: userData.userEmail,
            tipoUser: userData.tipoUser,
            statusConta:userData.statusUser,
            dataCriacao: userData.criadoDate
        };
        // console.log(`\n\n\n user: \n ${user}\n\n`)


        return user
    }
    async listUsers(){
        const allUser = await this.prisma.usuario.findMany({
            where:{
                statusUser:"ATIVA",
            },
            orderBy:{
                userNome:'desc'
            },
            include: {
                ti:true,
                docente:true,
                adm:true
            }

        })
        if (!allUser){
            console.log('Nenhum usuaário encontrado')
        }
        return allUser
    }
    

}