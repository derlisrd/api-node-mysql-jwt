
import { dateFormatNowYMDHMS } from "../App/helpers.js"
import { conexion } from "../Database/Connect.js"
import { compareAsync } from "../Middleware/bcrypt.js"
import bcrypt from 'bcrypt'
//import { UserModel } from "../Models/UserModel.js"
import {found,foundok,notfound,notfoundNone} from "./ResponseController.js"

export class UserController {
    
    static findOne = async(req,res)=>{

        try {
            const {id} = req.params
            let results = await conexion.query(`SELECT id_user,username_user,email_user,nombre_user,try_user,rol_user FROM users WHERE id_user=? LIMIT 1;`,[id])
            return res.status(200).json(found(results))

        } catch (e) {
            return res.status(404).json(notfound(e))
        }
    }
    static getAll = async(req,res)=>{
        try {
            let size = parseInt(req.query.size) ?? 60
            let page = parseInt(req.query.page) ?? 0        
            let results = await conexion.query(`SELECT id_user,username_user,email_user,nombre_user,try_user,rol_user FROM users LIMIT ?,?`,[page,size])
            return res.status(200).json(found(results))
        } catch (e) {
            return res.status(404).json(notfound(e))
        }
    }

    static update = async(req,res)=>{
        try {
            const {id} = req.params
            let find = await conexion.query(`SELECT id_user FROM users WHERE id_user=? LIMIT 1`,[id])
            if(find[0].length<1){
                return res.status(404).json(notfoundNone('Not found!'))
            }
            const {body} = req
            if(body.password_user || body.try_user || body.last_login_user){
                return res.status(404).json(notfound('Problems con params'))
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (body.email_user && !emailRegex.test(body.email_user)) {
                return res.status(404).json(notfound('Email format is wrong'))
            }
            let campos = Object.keys(body)
            let valores = Object.values(body);
            let sets = ''
            campos.forEach(elm=>{
                sets += `${elm} = ?, `
            })
            sets += `updated_at = ?`
            valores.push(dateFormatNowYMDHMS(),id)
            
            let sql = `UPDATE users SET ${sets} WHERE id_user = ?;`
            let update = await conexion.query(sql,valores)
            if(update){
                return res.status(200).json(foundok('Updated!'))
            }
        } catch (err) {
            return res.status(404).json(notfound(err))
        }
    }

    static updatepassword = async(req,res)=>{
        try {

            const {password_user, confirm_password,new_password} = req.body
            const {id} = req.params
            if(!password_user){ return res.status(404).json(notfound('Not found password')) }
            if(new_password!==confirm_password || !confirm_password || !new_password){
                return res.status(404).json(notfound('new password and confirm password are not equal'))
            }
            let find = await conexion.query(`SELECT id_user,password_user FROM users WHERE id_user=? LIMIT 1`,[id])
            if(find[0].length <1){
                return res.status(404).json(notfoundNone('Not found!'))
            }

            let first = find[0][0]

            let sena = await compareAsync(password_user,first.password_user)
            if(!sena){
                return res.status(404).json(notfound('Password is incorrect'))
            }

            const hash = bcrypt.hashSync(new_password, 10);
            await conexion.query('UPDATE users SET password_user = ? WHERE id_user = ?;',[hash,id])
            return res.status(200).json(foundok('Updated!'))
        } catch (error) {
            return res.status(404).json(notfound(error))
        }
    }

}