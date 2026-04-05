import { Route, Tags, Post, Body, Controller, SuccessResponse, Res, Get,Request as TsoaRequest, Request, Response} from "tsoa";

import type { TsoaResponse } from "tsoa";
import passport from "passport";
import type{ IMicrosoftProfile } from "../interfaces/microsoft/IMicrosoftProfile.js";

import type{ Request as ExRequest, Response as ExResponse } from "express";

//Arvore de dependencia:
import { AuthController } from "@/controllers/authController.js";
import { AuthService } from "@/services/authService.js";
import { PrismaService } from "@/database/database.js";
import { resolve } from "node:dns";
import { any, regex } from "zod";
import { get, request } from "node:http";
import { tr } from "zod/locales";
import { Result } from "pg";


const prismaService = new PrismaService();
const authService = new AuthService(prismaService);
const authController = new AuthController(authService)



@Route("Auth")
@Tags("autenticacao")
export class AuthRouter extends Controller{

    @Get("login")
    public async login(
        @Request() req:any,
        // @Res() res:TsoaResponse<201, {msg: string}>
    ):Promise<void>{
        return new Promise((resolve, reject)=>{
            passport.authenticate('azuread-openidconnect')(req, req.res, (err:any)=>{
            if (err) {
                console.log(err)
                return reject(err);
                // return res(201, {msg: err.msg})
            }
            resolve()
            // return res(201, {msg: "sucesso ao acessar valores"})
        });
        })
        
        // passport.authenticate('azuread-openidconnect')(req, res, (err:any)=>{
        //     if (err) {
        //         console.log(err)
        //         return res(201, {msg: err.msg})
        //     }
            
        //     return res(201, {msg: "sucesso ao acessar valores"})
        // });
    }


    @Get("callback")
    @SuccessResponse("200", "Autenticado")
    public async handleCallback(
        // @Body() profile: IMicrosoftProfile,
        @Request() req:any,
        @Res() errorRes: TsoaResponse<500, {error: string}>

    ) {
        return new Promise((resolve, reject) => {
        passport.authenticate('azuread-openidconnect', { session: false }, async (err: any, profile: IMicrosoftProfile) => {
            if (err || !profile) {
                return reject(errorRes(500, { error: "Falha na autenticação Microsoft" }));
            }

            try {

                const result =await authController.handleCallBack(profile);
                
                req.session.userId = result.user.userID;
                console.log(`\n\n\n${result.token_jwt}\n\n`)
                
                
                // return req.res.redirect(`/api-docs?token=${result.token_jwt}`);
                const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
                return req.res.redirect(`${frontendUrl}/?token=${result.token_jwt}`);

            } catch (error: any) {
                return reject(errorRes(500, { error: error.message }));
            }
        })(req, req.res); // Passamos o req/res do Express para o Passport trabalhar
    });
        // try {
        //     const profile = req.user as IMicrosoftProfile
                
        //     await authController.handleCallBack(profile);
            
        //     return req.res.redirect('/api-docs') 
        // } catch (error: any) {
        //     console.log("erro no processamento de login:", error.message)
        //     return errorRes(500, { error: error.message });

        //     // throw error
        //     // return req.res.redirect('/login?error=access_denied')

        // }
    }

    @Get("refresh")
    @SuccessResponse("200", "TokenRenovado")
    public async refresh(
        @Request() req:any,
        @Res() unauthorizedRes: TsoaResponse<401, {error: string}>
    ):Promise<{accessToken:string}>{
        const userId =req.session?.userId;

        if(!userId){
            return unauthorizedRes(401, {error:"Sessão expirada ou invalida"})
        }
        try{
            const newToken = await authController.handleRefreshToken(userId);
            console.log(newToken.token_jwt)
            return {accessToken: newToken.token_jwt}
        }catch(error:any){
            return unauthorizedRes(401, {error:"Não foi possivel renovar o token"})
        }
    }
}