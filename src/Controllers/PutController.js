import {conexion} from '../Database/Connect.js'
import { ENV } from "../App/config.js"
import pkg from 'jsonwebtoken';
import { dateFormatNowYMDHMS } from '../App/helpers.js';
const { verify } = pkg;

export const PutController = async(req,res)=>{


    const token_autho = req.headers.authorization
    if(!token_autho){
        return res.status(401).json({
            response:false,
            error:true,
            message:'Token not found'
        })
    }
    
    const token = token_autho.split(' ')[1]
    if(!token){
        return res.status(401).json({
            response:false,
            error:true,
            message:'Token format is no valid'
        })
    }
    
    
    const {table,id} = req.params
    if(!table) return res.status(404).json({response:false,error:true,message: 'Table not found'})
    if(!id) return res.status(404).json({response:false,error:true,message: 'ID param not found'})

    const {body} = req
    
    
    try {
        const payload = verify(token,ENV.SECRET_JWT)
        if(Date.now()> payload.exp){
            return res.status(401).json({
                response:false,
                error:true,
                message:'Token expired'
            })   
        }
        

        
        let id_table = 'id_'+table.substring(0, table.length-1)
        let campos = Object.keys(body)
        let valores = Object.values(body);
        let sets = ''
        campos.forEach(elm=>{
            sets += `${elm} = ?, `
        })
        sets += `updated_at = ?`
        valores.push(dateFormatNowYMDHMS(),id)
        let sql = `UPDATE ${table} SET ${sets} WHERE ${id_table} = ?;`
        await conexion.query(sql,valores);
        return res.status(200).json({
            response:true, error:false,
            message:"Updated!",
        })
    }
    catch (e) {
        return res.status(500).json({
            error:true,
            response:false,
            message: e
        })
    }

    
}