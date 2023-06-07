import { ENV } from "../App/config.js";


export default function (req, res, next){
    try {        
        const api_key = req.headers['x-api-key'] ?? null;
        
        if(api_key!==ENV.X_API_KEY)
        {
           return res.status(401).json({response:false,error:true,message:"API KEY INVALID"});  
        }
        return next();
    } catch (error) {
        return res.status(400).json({response:false,error:true,message:"API KEY INVALID"});
    }
}