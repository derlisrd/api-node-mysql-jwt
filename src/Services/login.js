import {conexion} from '../Database/Connect.js'
import {notfound} from "../Controllers/ResponseController.js"
import { ENV } from "../App/config.js";
import { dateFormatNowYMDHMS } from '../App/helpers.js';
import jwt from 'jsonwebtoken';
import { compareAsync } from '../Middleware/bcrypt.js';
const { sign} = jwt;


const TOKEN_TIME_EXPIRED =  Date.now()+ 1000*60 * parseInt(ENV.TOKEN_EXPIRED_MINUTES) 

export default async function(req,res){
    const {email_user,password_user} = req.body
        if(!email_user || !password_user){
            return res.status(500).json(notfound(`Params invalid`))
        }
        try {
            let query = await conexion.query(`SELECT id_user,nombre_user,username_user,email_user,password_user,try_user,last_try_login_user FROM users WHERE email_user = ? or username_user = ?`,
            [email_user,email_user])        
            let found = query[0].length || 0
            if(found>0){
                let first = query[0][0]
                let try_user = first.try_user
                let last_try_date = first.last_try_login_user
                let date_now = new Date()
                let diff = Math.round(((date_now - last_try_date) / 60000))
                if(try_user>6  && diff<15 ){
                    let intente = 15 - diff
                    return res.status(401).json({response:false,error:true,message:`Try again about ${intente} minute(s)`})
                }
                
                
                let isMatch = await compareAsync(password_user, first.password_user)
                let datanow = dateFormatNowYMDHMS()
                if(!isMatch){
                    await conexion.query(`UPDATE users SET last_try_login_user = ?, try_user = try_user + 1 where id_user=${first.id_user}`,[datanow])
                    return res.status(401).json(notfound('Invalid credentials'))
                }
                
                const token = sign({sub:first.id_user,name:first.username_user,exp: TOKEN_TIME_EXPIRED},ENV.SECRET_JWT)
                await conexion.query(`UPDATE users SET last_login_user = ?, last_try_login_user=?, try_user=0 where id_user=${first.id_user}`,[datanow,datanow])
                return res.json({
                            found,
                            first: { id_user:first.id_user, nombre_user:first.nombre_user,email_user:first.email_user,token_user:token},
                            results: [{ id_user:first.id_user, nombre_user:first.nombre_user,email_user:first.email_user,token_user:token}],
                            response:true,
                            error:false 
                        })
                
            }else{
               return res.status(404).json(notfound(`invalid credentials`))
            }
    
        } catch (e) {
           return res.status(500).json(notfound(e))
        }
}