import {conexion} from '../Database/Connect.js'
import { ENV } from "../App/config.js";
import pkg from 'jsonwebtoken';
const { sign } = pkg;



export const LoginController = async(req,res)=>{
    const {email,password} = req.body
    try {
        let query = await conexion.query(`SELECT id_user,nombre_user,username_user,password_user FROM users WHERE email_user = ? or username_user = ?`,[email,email])
        res.status(200).json({
            results: query[0]
        })

    } catch (e) {
        res.status(404).json({
            error:true,
            response:false,
            message: e
        })
    }
}

export const RegisterController = async(req,res)=>{
    const {email,password} = req.body
}