import { conexion } from "../Database/Connect.js"
//import { UserModel } from "../Models/UserModel.js"

export class UserController {

    static getAll = async(req,res)=>{
    try {
        let size = req.query.size ?? '60'
        let page = req.query.page ?? '0'        
        let results = await conexion.query(`SELECT id_user,username_user,email_user,nombre_user,try_user,rol_user FROM users LIMIT ${page},${size}`)
        return res.status(200).json({found: results[0].length,response:true,error:false,results: results[0]})
    } catch (e) {
        return res.status(404).json({
            error:true,
            response:false,
            message: e
        })
    }
    }

}