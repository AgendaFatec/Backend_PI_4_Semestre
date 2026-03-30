import { Controller, Request, Response } from "tsoa";
import { CoordenadorService } from "@/services/coordenador/coordenadorService.js";
import { NewUser, CreateUser } from "@/interfaces/coordenacao/Coordenacao.js";
import { StatusConta, TipoUser } from "@prisma/client";


export class CoordenacaoController extends Controller{
    constructor(private coordenacaoService: CoordenadorService){
    super();
    }
    async handleCreateUser(newUser: CreateUser){
        const newUserData: NewUser = {
            ...newUser,
            statusConta: "CONVIDADA",
            dataCriacao: new Date()
        };
        return await this.coordenacaoService.createNewUser(newUserData)
    }
    async handleFindUsers(tipoUser?:TipoUser, statusConta?:StatusConta){

        return await this.coordenacaoService.listUsers(tipoUser, statusConta)
    }
}