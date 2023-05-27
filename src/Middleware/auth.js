import { ENV } from "../App/config.js";
import pkg from 'jsonwebtoken';
const { verify } = pkg;

export default function (req, res, next){
    try {
        
        const token_autho = req.headers.authorization
        
        const token = token_autho.split(' ')[1]
        if(!token){
            return res.status(401).json({
                response:false,
                error:true,
                message:'Token format is no valid'
            })
        }
        if (!token) return res.status(403).json({response:false, error:true, message:"Access denied."});
        
        const payload = verify(token,ENV.SECRET_JWT)

        if(Date.now()> payload.exp){
            return res.status(401).json({
                response:false,
                error:true,
                message:'Token expired'
            })   
        }
        next();
    } catch (error) {
        res.status(400).json({response:false,error:true,message:"Invalid token"});
    }
}