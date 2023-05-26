
import {conexion} from '../Database/Connect.js'
import { ENV } from "../App/config.js";
import pkg from 'jsonwebtoken';
const { verify } = pkg;

export const GetController = async(req,res)=>{

    const token_autho = req.headers.authorization
    if(!token_autho){
        res.status(401).json({
            response:false,
            error:true,
            message:'Token not found'
        })
    }

    const token = token_autho.split(' ')[1]
    const payload = verify(token,ENV.SECRET_JWT)

    if(Date.now()> payload.exp){
        return res.status(401).json({
            response:false,
            error:true,
            message:'Token expired'
        })
        
    }

    const table = req.params.table
    try {
        let query = await conexion.query(`SELECT * FROM ${table}`);    
        res.status(200).json({
            response:true,
            error:false,
            results:query[0]
        })
    } catch (e) {
        res.status(404).json({
            error:true,
            response:false,
            message: e
        })
    }
}



