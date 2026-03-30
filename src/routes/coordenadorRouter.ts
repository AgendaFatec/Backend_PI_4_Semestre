import {Query, Delete, Route, Tags, Post, Body, Controller, SuccessResponse, Res, Get, Patch, Request as TsoaRequest, Request, Response} from "tsoa";

import type { TsoaResponse } from "tsoa";
import type { Request as ExRequest, Response as ExResponse  } from "express";

import { CoordenadorService } from "@/services/coordenador/coordenadorService.js";
import { CoordenacaoController } from "@/controllers/coordenadorController.js";



import { PrismaService } from "@/database/database.js";
import type { CreateUser } from "../interfaces/coordenacao/Coordenacao.js";

import type { FindUsers } from "../interfaces/coordenacao/Coordenacao.js";

import { NewUserSchema} from "@/schemas/UserSchemas.js";
import { any } from "zod";
import { error } from "node:console";
import { StatusConta, TipoUser } from "@prisma/client";


const prismaService = new PrismaService()
const coordenacaoService = new CoordenadorService(prismaService)
const coordenacaoController = new CoordenacaoController(coordenacaoService)



@Route("Coordenacao")
@Tags("coordenador")
export class CoordeandorRouter extends Controller{


    @Post("Criar_Usuario")
    @SuccessResponse("201", "Created")
    @Response("400", "Validation Failed")
    public async handleCreateUser(
        @Body() valuesUser: CreateUser,
        @Request() badRequest: TsoaResponse<400, {msg: string, details?:any}>
    ){
        const validation = NewUserSchema.safeParse(valuesUser)
        if(!validation.success){
            return badRequest(400,{
                msg:"Dados de usuário invalidos",
                details:validation.error.format()
            })
        }
        // return {message:`usuario criado: ${valuesUser.email} \n${valuesUser.tipoUser}`}
        const result = await coordenacaoController.handleCreateUser(validation.data)
        this.setStatus(201)
        return result
    }

    @Get("listar")
    @SuccessResponse("200", "Search Completed")
    @Response("400", "Bad Request")
    public async handleFindUsers(
        @Res() errorRes: TsoaResponse<400, { msg: string }>,
        @Query() tipoUser?: TipoUser,   
        @Query() statusConta?: StatusConta
    ){

        try {
            return await coordenacaoController.handleFindUsers(tipoUser, statusConta);
        } catch (error) {
            return errorRes(400, { msg: "Erro ao listar usuários" });
        }
    }

}