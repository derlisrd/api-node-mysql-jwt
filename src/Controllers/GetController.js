
import {conexion} from '../Database/Connect.js'
import { ENV } from "../App/config.js";
import pkg from 'jsonwebtoken';
const { sign } = pkg;

export const GetController = async(req,res)=>{

    const token = sign({
        sub : '1',
        name: 'derlis',
        exp: Date.now() + 60 *1000
    }, ENV.SECRET_JWT )

    const table = req.params.table
    try {
        let query = await conexion.query(`SELECT * FROM ${table}`);    
        res.status(200).json({
            response:true,
            error:false,
            results:query[0],
            token:token
        })
    } catch (e) {
        res.status(404).json({
            error:true,
            response:false,
            message: e
        })
    }
}



