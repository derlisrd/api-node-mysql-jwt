import {conexion} from '../Database/Connect.js'
import bcrypt from 'bcrypt';
import { ENV } from "../App/config.js";
import pkg from 'jsonwebtoken';
const { sign } = pkg;



export const LoginController = async(req,res)=>{
    const {email_user,password_user} = req.body
    if(!email_user || !password_user){
        res.status(500).json({
            response:false,
            error:true,
            message:`Params invalid`
          })
        return;
    }
    try {
        let query = await conexion.query(`SELECT id_user,nombre_user,username_user,email_user,password_user FROM users WHERE email_user = ? or username_user = ?`,
        [email_user,email_user])        
        let found = query[0].length || 0
        if(found>0){
            let first = query[0][0]
            bcrypt.compare(password_user, first.password_user, (error, isMatch) => {
                if (error) {
                  res.status(500).json({
                    response:false,
                    error:true,
                    message:error
                  })
                } else {
                  if (isMatch) {
                    // Credenciales válidas
                    const token = sign({sub:first.id_user,name:first.username_user,exp: Date.now()+60*1000},ENV.SECRET_JWT)
                    res.status(200).json({
                        found,
                        first: { id_user:first.id_user, nombre_user:first.nombre_user,email_user:first.email_user,token_user:token},
                        results: [{ id_user:first.id_user, nombre_user:first.nombre_user,email_user:first.email_user,token_user:token}],
                        response:true,
                        error:false 
                    })
                  } else {
                    // Credenciales inválidas
                    res.status(401).json({
                        response:false,
                        error:true,
                        message:'Password invalid'
                      })
                  }
                }
              }); 
            
        }else{
            res.status(404).json({
                error:true,
                response:false,
                message: `User don't available`
            })
        }

    } catch (e) {
        res.status(404).json({
            error:true,
            response:false,
            message: e
        })
    }
}






export const RegisterController = async(req,res)=>{
    const {username_user,email_user,password_user,confirm_password,nombre_user} = req.body
    if(!username_user || !email_user || !password_user){
        res.status(404).json({
            response:false,
            error:true,
            message:'Params not found'
        })
        return
    }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email_user)) {
            res.status(400).json({
                response:false,
                error:true,
                message:'E-mail invalid!'
            })
            return
        }
    try {
        
        let query = await conexion.query(`SELECT id_user,nombre_user,username_user,password_user FROM users WHERE email_user = ? or username_user = ?`,
        [email_user,username_user])
        let found = query[0].length
        if(found>0){
            res.status(200).json({
                response:false,
                error:true,
                message:'There is an email or username in the database. Try another.',
                found,
            })
        }else{
            
                if(confirm_password !== password_user){
                    res.status(400).json({response:false,error:true,message:'password_user and confirm_password do not match'})
                    return
                }
                
                const hash = bcrypt.hashSync(password_user, 10);
                    
                    let resultInsert = await conexion.query(
                        'INSERT INTO users (email_user,username_user,password_user,nombre_user) VALUES (?, ?, ?, ?);',
                        [email_user,username_user,hash,nombre_user]
                      );
                   
                    res.status(200).json({
                        response:true, error:false,
                        message:"Register!", 
                        last_id: resultInsert[0].insertId
                    })
                
            
        } 
    }catch (e) {
        res.status(404).json({
            error:true,
            response:false,
            message: e
        })
    }
}


