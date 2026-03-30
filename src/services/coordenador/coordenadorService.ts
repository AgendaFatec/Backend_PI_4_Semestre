import { Profile } from "passport";
import { PrismaService } from "@/database/database.js";
import {TipoUser as PrismaTipoUser, StatusConta, TipoUser} from "@prisma/client"
import { omit } from "zod/mini";
import { NewUser, ValuesToFind } from "@/interfaces/coordenacao/Coordenacao.js"; 
import { create } from "node:domain";
import { tr } from "zod/locales";
import { all } from "axios";


export class CoordenadorService{
    constructor(private prisma: PrismaService){}

    async createNewUser(newUser: NewUser){
        const userData = await this.prisma.usuario.create({
            data:{
                userEmail: newUser.email,
                tipoUser: newUser.tipoUser,
                criadoDate: newUser.dataCriacao,
                statusUser: newUser.statusConta,

                docente: newUser.tipoUser === TipoUser.DOCENTE ? {create:{}}:undefined,
                ti: newUser.tipoUser === TipoUser.TI ? {create:{}}:undefined,
                adm: newUser.tipoUser === TipoUser.ADM ? {create:{}}:undefined
            },
            include:{
                docente:true,
                ti:true,
                adm:true
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
    async listUsers(tipoUser?:TipoUser, statusConta?:StatusConta){


    const filter: any = {};
    if (tipoUser) filter.tipoUser = tipoUser;
    if (statusConta) filter.statusUser = statusConta;

    return await this.prisma.usuario.findMany({
        where: filter,
        select: {
            userID: true,
            userNome: true,
            userEmail: true,
            criadoDate: true,
            fotoUrl: true,
            statusUser: true,
            tipoUser: true,
            ti: true,
            docente: true,
            adm: true
        },
        orderBy: {
            userNome: 'desc'
        }
    });


        // if (tipoUser){
        //     const allUser = await this.prisma.usuario.findMany({
        //     select:{
        //         userID:true,
        //         userNome:true,
        //         userEmail:true,
        //         criadoDate:true,
        //         fotoUrl:true,
        //         statusUser:true,
        //         ti:true,
        //         docente:true,
        //         adm:true
        //     },
        //     where:{
        //         tipoUser: tipoUser,
        //     },
        //     orderBy:{
        //         userNome:'desc'
        //     },
            
        //     })
        //     return allUser
        // }
        // if(statusConta){
        //     const allUser = await this.prisma.usuario.findMany({
        //     select:{
        //         userID:true,
        //         userNome:true,
        //         userEmail:true,
        //         criadoDate:true,
        //         fotoUrl:true,
        //         statusUser:true,
        //         ti:true,
        //         docente:true,
        //         adm:true
        //     },
        //     where:{
        //         statusUser: statusConta,
        //     },
        //     orderBy:{
        //         userNome:'desc'
        //     }
        //     })
        //     return allUser
        // }
        // else{
        //     const allUser = await this.prisma.usuario.findMany({
        //     select:{
        //         userID:true,
        //         userNome:true,
        //         userEmail:true,
        //         criadoDate:true,
        //         fotoUrl:true,
        //         statusUser:true,
                
        //         ti:true,
        //         docente:true,
        //         adm:true
        //     },
        //     orderBy:{
        //         tipoUser: "desc"
        //     }
        //     })
        //     return allUser
        // }

    }
    

}