import { Profile } from "passport";
import {prisma} from "../../database/database.js"
import {TipoUser as PrismaTipoUser} from "@prisma/client"

export class CoordService{
    async coordCreate(email: string, tipoUser:PrismaTipoUser){
    }

}