import {conexion} from '../Database/Connect.js'
import bcrypt from 'bcrypt';
import { ENV } from "../App/config.js";
import pkg from 'jsonwebtoken';
const { sign } = pkg;



export const LoginController = async(req,res)=>{
    const {email_user,password_user} = req.body
    try {
        let query = await conexion.query(`SELECT id_user,nombre_user,username_user,password_user FROM users WHERE email_user = ? or username_user = ?`,
        [email_user,email_user])
        let found = query[0].length
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
                    res.status(200).json({
                        found,
                        first,
                        results: query[0],
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
    const {username_user,email_user,password_user} = req.body
    if(!username_user || !email_user || !password_user){
        res.status(404).json({
            response:false,
            error:true,
            message:'Params not found'
        })
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
            let email, username, hashedPassword;
            conexion.query(
                'INSERT INTO users (email_user,username_user,password_user) VALUES (?, ?, ?)',
                [email,username,hashedPassword],
                error => {
                  if (error) {
                    console.error('Error al guardar el usuario: ', error);
                    res.sendStatus(500);
                  } else {
                    // Registro exitoso
                    res.sendStatus(200);
                  }
                }
              );


        } 
    }catch (e) {
        res.status(404).json({
            error:true,
            response:false,
            message: e
        })
    }
}