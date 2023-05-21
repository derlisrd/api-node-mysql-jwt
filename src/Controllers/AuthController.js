import {conexion} from '../Database/Connect.js'
import bcrypt from 'bcrypt';
import { ENV } from "../App/config.js";
import pkg from 'jsonwebtoken';
const { sign } = pkg;



export const LoginController = async(req,res)=>{
    const {email,password} = req.body
    try {
        let query = await conexion.query(`SELECT id_user,nombre_user,username_user,password_user FROM users WHERE email_user = ? or username_user = ?`,[email,email])
        let found = query[0].length
        if(found>0){
            let {user_password} = query[0]
            bcrypt.compare(password, user_password, (error, isMatch) => {
                if (error) {
                  res.json({
                    response:false,
                    error:true,
                    message:'Password invalid'
                  })
                } else {
                  if (isMatch) {
                    res.json({
                        response:false,
                        error:true,
                        message:'Password invalid'
                      })
                  } else {
                    // Credenciales inválidas
                    res.json({
                        response:false,
                        error:true,
                        message:'Password invalid'
                      })
                  }
                }
              });
        }
        /* res.status(200).json({
            results: query[0]
        }) */

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