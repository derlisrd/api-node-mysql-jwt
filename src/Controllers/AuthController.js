import {conexion} from '../Database/Connect.js'
import {notfound} from "./ResponseController.js"
import { ENV } from "../App/config.js";
import { dateFormatNowYMDHMS } from '../App/helpers.js';
import pkg from 'jsonwebtoken';
import { compareAsync } from '../Middleware/bcrypt.js';
import bcrypt from 'bcrypt'
//import { UserModel } from '../Models/UserModel.js';
const { sign,verify } = pkg;

const TOKEN_TIME_EXPIRED =  Date.now()+1000*60* 150 

export class AuthController {
    static login = async(req,res)=>{
        const {email_user,password_user} = req.body
        if(!email_user || !password_user){
            return res.status(500).json(notfound(`Params invalid`))
        }
        try {
            /* let query2 = await UserModel.findOne({where:{username_user: email_user}})
            res.json({query2}) */
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
            res.status(404).json(notfound(e))
        }
    }





    static register  = async(req,res)=>{
        const {username_user,email_user,password_user,confirm_password,nombre_user} = req.body
        if(!username_user || !email_user || !password_user){
            return res.status(404).json(notfound('Params not found'))
            
        }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email_user)) {
                return res.status(400).json(notfound('E-mail invalid!'))
            }
        try {
            
            let query = await conexion.query(`SELECT id_user,nombre_user,username_user,password_user FROM users WHERE email_user = ? or username_user = ?`,
            [email_user,username_user])
            let found = query[0].length
            if(found>0){
                return res.status(401).json({
                    response:false,
                    error:true,
                    message:'There is an email or username in the database. Try another.',
                    found
                })
            }else{
                
                    if(confirm_password !== password_user){
                        return res.status(400).json({response:false,error:true,message:'password_user and confirm_password do not match'})
                    }
                    
                    const hash =  bcrypt.hashSync(password_user, 10);
                    const valores = [email_user,username_user,hash,nombre_user];
                    
                    let resultInsert = await conexion.query(
                            'INSERT INTO users (email_user,username_user,password_user,nombre_user) VALUES (?, ?, ?, ?);',
                            valores
                    );
                       
                       return res.json({
                            response:true, error:false,
                            message:"Register!", 
                            last_id: resultInsert[0].insertId
                        }) 
                    
                
            } 
        }catch (e) {
           return res.status(404).json(notfound(e))
        }
    }

    static refreshToken = (req,res)=>{
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









