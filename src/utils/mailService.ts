import { TipoUser } from "@prisma/client";
import * as nodemailer from "nodemailer"
import { number } from "zod";
import { tr } from "zod/locales";




export class MailService{
    private transporter;
    private linkAcessoLogin;
    constructor(){
        this.linkAcessoLogin = process.env.FRONTEND_URL,
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            secure:false,
            auth:{
                user:process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false // Importante para evitar bloqueios de certificados em redes de faculdade
            }
        })
    }
    async sendInvitation(email:string,tipoUser:TipoUser,userName?:string|null){
        const htmlBody=`
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2>Olá, ${userName ? userName : 'Usuário'} de emai: ${email}!</h2>
            <p>Você foi convidado para ter acesso ao sistema de inventário e agendamento de salas como: ${tipoUser}</p>
            <p>Clique no botão abaixo para prosseguir e realizar o primeiro Login:</p>
            <a href="${this.linkAcessoLogin}/login" 
            style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Acessar página de login.
            </a>
            <hr />
            <small>Se você não solicitou isso, ignore este e-mail.</small>
        </div>
        `;
        try{
            const resutaldoInvitation = await this.transporter.sendMail({
                from:'"Sistema de inventário e reserva de sala\nSala-Fácil\n"<no-reply@suaapp.com>',
                to:email,
                subject:'Contive de boas vindas',
                html:htmlBody
            })
            return resutaldoInvitation
        }catch(error){
            throw new Error(`Falha ao enviar e-mail\n${error}`);
        }

    }

}
