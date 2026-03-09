import { Route, Tags, Post, Body, Controller, SuccessResponse, Res, Get,Request as TsoaRequest, Request, Response} from "tsoa";

import type { TsoaResponse } from "tsoa";
import passport from "passport";
import { AuthController } from "../controllers/authController.js";
import type{ IMicrosoftProfile } from "../interfaces/microsoft/IMicrosoftProfile.js";

import type{ Request as ExRequest, Response as ExResponse } from "express";

const authController = new AuthController()
@Route("Auth")
@Tags("autenticacao")
export class AuthRouter extends Controller{

    @Get("login")
    public async login(
        @Request() req:any,
        @Res() res:TsoaResponse<201, {msg: string}>
    ):Promise<void>{
        passport.authenticate('azuread-openidconnect')(req, res, (err:any)=>{
            if (err) {
                console.log(err)
                return res(201, {msg: err.msg})
            }
            return res(201, {msg: "sucesso ao acessar valores"})
        });
    }


    @Post("callback")
    @SuccessResponse("200", "Autenticado")
    public async handleCallback(
        @Body() profile: IMicrosoftProfile,
        @Res() errorRes: TsoaResponse<500, {error: string}>
    ) {
        try {
            return await authController.handleCallBack(profile);
        } catch (error: any) {
            return errorRes(500, { error: error.message });
        }
    }
}