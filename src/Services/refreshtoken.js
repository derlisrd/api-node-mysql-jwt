
import { ENV } from "../App/config.js";

const TOKEN_TIME_EXPIRED =  Date.now()+ 1000*60 * parseInt(ENV.TOKEN_EXPIRED_MINUTES) 

function refreshToken(req,res) {
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
            
            const nuevo_token = sign({sub:payload.sub,name:payload.name,exp: TOKEN_TIME_EXPIRED},ENV.SECRET_JWT)
            return res.status(200).json({
                response:true,
                error:false,
                token:nuevo_token
            })


        } catch (error) {
            return res.status(401).json({
                response:false,
                error:true,
                message:error
            })
        }
}

export default refreshToken;