import { ENV } from "../App/config.js";
import pkg from 'jsonwebtoken';
import register from '../Services/register.js';
import login from '../Services/login.js';
import refreshToken from "../Services/refreshtoken.js";
const { sign,verify } = pkg;



export class AuthController {
    static login = async(req,res)=>{
        return await login(req,res)
    }

    static register  = async(req,res)=>{
        return await register(req,res)
    }

    static refreshToken = (req,res)=>{
        return refreshToken(req,res)
    }



    static checkToken = async(req,res)=>{
        const token_autho = req.headers.authorization
        if(!token_autho){
            res.status(401).json({
                response:false,
                error:true,
                message:'Token not found'
            })
        }

        try {
            const token = token_autho.split(' ')[1]
            const payload = verify(token,ENV.SECRET_JWT)

            if(Date.now()> payload.exp){
                return res.status(401).json({
                    response:false,
                    error:true,
                    message:'Token expired'
                })   
            }
            return res.status(200).json({
                response:true,
                error:false,
                results:payload
            })

        } catch (error) {
            return res.status(401).json({
                response:false,
                error:true,
                message:error
            })
        }
    }



    static checkToken2 = (req,res)=>{

        try {
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
        const payload = verify(token,ENV.SECRET_JWT)
            if(Date.now()> payload.exp){
                return res.status(401).json({
                    response:false,
                    error:true,
                    message:'Token expired'
                })   
            }
        if(!payload){
            return res.status(401).json({
                response:false,
                error:true,
                message:payload
            })
        }
        } catch (err) {
            return false
        }
        
    }


}









