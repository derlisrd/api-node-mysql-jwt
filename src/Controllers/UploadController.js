import { ENV } from "../App/config.js"
import { conexion } from "../Database/Connect.js"

const UploadController = async(req,res)=>{
    try {
        const {table} = req.params
        const {file} = req
        if(file){
            if(table){
                let sql = `INSERT INTO ${table} (name_image,url_image) VALUES (?,?);`
                let url = ENV.UPLOAD_PATH+'/'+file.filename
                let valores = [file.filename,url]
                let resultInsert = await conexion.query(sql,valores);
                return res.json({
                    response:true,
                    error:false,
                    message: 'Upload!',
                    last_id: resultInsert[0].insertId
                })
            }
            return res.json({
                response:true,
                error:false,
                message: file
            })
        }
    } catch (e) {
        return res.status(500).json({
            response:false,
            error:true,
            message:e
        })
    }
}
export {UploadController}