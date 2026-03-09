import {prisma} from '../database/database.js'


export const findOrCreateuser =async (microsoftProfile:any)=>{
    const {email, userName, oid} = microsoftProfile;

    let user = await prisma.usuario.findUnique({
        where: {microsoft_sub: oid}
    });
    if (!user){
        user = await prisma.usuario.create({
            data:{
                microsoft_sub:oid,
                userEmail: email,
                userNome: userName,
                userSenha: 'oauth_managed'
            }
        })
    }
    return user

}