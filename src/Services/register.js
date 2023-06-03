import {conexion} from '../Database/Connect.js'
import {notfound} from "../Controllers/ResponseController.js"
import bcrypt from 'bcrypt'

async function register(req,res){
    const {username_user,email_user,password_user,confirm_password,nombre_user} = req.body
        if(!username_user || !email_user || !password_user || !nombre_user){
            return res.status(404).json(notfound('Params not found or incomplete'))
            
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
                    
                    const hash =  bcrypt.hashSync(password_user, 8);
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
export default register