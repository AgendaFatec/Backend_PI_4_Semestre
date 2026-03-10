import { profile } from 'node:console';
import {prisma} from '../database/database.js'
import type { IMicrosoftProfile } from '../interfaces/microsoft/IMicrosoftProfile.js';

export class AuthService{
    async findOrCreateuser (microsoftProfile:IMicrosoftProfile){
        console.log("Perfil recebido da Microsoft:", JSON.stringify(microsoftProfile, null, 2));
        // const email:string = microsoftProfile.email[0] ?? "";
        const email:string = (Array.isArray(microsoftProfile.email) ? microsoftProfile.email[0] : microsoftProfile.email) || 
  microsoftProfile.preferreed_username || 
  "email-nao-fornecido@fatec.sp.gov.br";
        let user = await prisma.usuario.findUnique({
            where: {microsoft_sub: microsoftProfile.oid}
        });
        if (!user){
            user = await prisma.usuario.create({
                data:{
                    microsoft_sub:microsoftProfile.oid,
                    userEmail: email,
                    userNome: microsoftProfile.userName || "Seu nome",
                    userSenha: 'oauth_managed'
                }
            })
        }else{
            if (user.userEmail !== email){
                await prisma.usuario.update({
                    where:{microsoft_sub:microsoftProfile.oid},
                    data: {userEmail: email}
                })
            }
        }
        return user

    }
}