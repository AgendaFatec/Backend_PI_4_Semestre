import { profile } from 'node:console';
// import {prisma} from '../database/database.js'

import { PrismaService } from '@/database/database.js';
import type { IMicrosoftProfile } from '../interfaces/microsoft/IMicrosoftProfile.js';
import { Prisma } from '@prisma/client';
import { msGraphClient, getUserPhoto } from './external/microsoftGraph.js';

import { StatusConta } from '@prisma/client';
import { Axios } from 'axios';

export class AuthService{
    constructor(private prisma: PrismaService){}

    async findAndValidate (microsoftProfile:IMicrosoftProfile){
        console.log("Perfil recebido da Microsoft:", JSON.stringify(microsoftProfile, null, 2));
        // const email:string = microsoftProfile.email[0] ?? "";

        const email:string = (Array.isArray(microsoftProfile.email) ? microsoftProfile.email[0] : microsoftProfile.email) || 
        microsoftProfile.preferred_username || 
        "email-nao-fornecido@fatec.sp.gov.br";

        // let user = await prisma.usuario.findUnique({
        //     where: {microsoft_sub: microsoftProfile.oid}
        // });
        // console.log(`\n\n\n${microsoftProfile.photoUser}\n\n ${microsoftProfile}\n\n`)
        
        // const photoTest:string = microsoftProfile.photoUser
        let [userBySub, userByEmail] = await Promise.all([
            
            this.prisma.usuario.findUnique({
                where:{microsoft_sub: microsoftProfile.oid}
            }),
            this.prisma.usuario.findUnique({
                where:{userEmail: email}
            })
        ])
        // console.log("Grupos do usuário:", microsoftProfile._json.groups);
        let user = userBySub || userByEmail;
        if (!user){ 
            console.log(`Tentativa de acesso negada: email: ${email} não existe não foi registrado para ter acesso`)
            throw new Error("Acesso negado: E-mail não pré-cadastrado pela coordenação.");

        }else if(!user.microsoft_sub){ // valida que se o usuário não tiver uma microsof_sub (oid identificação da conta) registrado no sistema
            // o usuário que recebeu o convite ou tem acesso ao serviço dos sitema possa, no primeiro login alterar o valor
            // do oid para seu priemeiro login

            // console.log("Token para o Graph:", microsoftProfile.accessToken);
            const photo = await getUserPhoto((microsoftProfile as any).accessToken);
            user = await this.prisma.usuario.update({
                where:{userEmail: email},
                data:{
                    userNome: microsoftProfile.userName,
                    microsoft_sub:microsoftProfile.oid,
                    userSenha: microsoftProfile.preferred_username || "microsoft_login",
                    statusUser: StatusConta.ATIVA,
                    fotoUrl: photo
                }
            })
            
        }else if(user.userEmail !== email && user.microsoft_sub === microsoftProfile.oid){ // verifica se o email não existe nos registros
            // caso não exisitir, mas ter uma assinatura de conta user.microsoft_sub (oid) presente na conta ele altera o valor do email
            // garante que se em um futuro o cps e microsoft decidirem alterar o dominoo novamente
            //seria problematico se a microsoft tivesse vazamento de dados
            
            user = await this.prisma.usuario.update({
                where:{microsoft_sub:microsoftProfile.oid},
                data:{userEmail:email}
            })
        }
            // }else{
        //     if (user.userEmail !== email){
        //         await prisma.usuario.update({
        //             where:{microsoft_sub:microsoftProfile.oid},
        //             data: {userEmail: email}
        //         })
        //     }
        // }
        return user

    }

}