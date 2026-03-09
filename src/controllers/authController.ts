import { Controller, Request, Response } from "tsoa";
import { AuthService } from "../services/authService.js";
import { IMicrosoftProfile } from "../interfaces/microsoft/IMicrosoftProfile.js";


export class AuthController extends Controller{
    private authService = new AuthService();
    async handleCallBack(profile: IMicrosoftProfile){
        return await this.authService.findOrCreateuser(profile)
    }
    
}