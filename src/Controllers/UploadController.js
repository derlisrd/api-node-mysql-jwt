import { ENV } from "../App/config.js"
import { conexion } from "../Database/Connect.js"
import fs from 'fs'

class UploadController {

    static singleImage = async(req,res)=>{
        if (!req.files || !req.files.image) {
           return res.status(400).json({response:false,error:false,message:'No file found.'})
        }
        
        const image = req.files.image;
        const imagePath = ENV.UPLOAD_PATH + image.name;

        if (image.size > 2 * 1024 * 1024) {
            return res.status(400).json({error:true,response:false,message:'El tamaño de la imagen excede el límite máximo de 2MB'});
        }
        
          // Verificar el formato de la imagen
          const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
          if (!allowedFormats.includes(image.mimetype)) {
            return res.status(400).json({error:true,response:false,message:'El formato de la imagen no es válido. Los formatos permitidos son JPEG y PNG'});
          }

        const {table} = req.params
        try {

            if (!fs.existsSync(ENV.UPLOAD_PATH)) {
                fs.mkdirSync(ENV.UPLOAD_PATH,{ recursive: true });
              }

            await image.mv(imagePath); // Mover la foto a la carpeta 'uploads'
            if(table){
                let sql = `INSERT INTO ${table} (name_image,url_image,static_image) VALUES (?,?,?);`
                let url = imagePath
                let fullUrl = req.protocol + '://' + req.get('host') + '/' + imagePath
                let valores = [image.name,url,fullUrl]
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
                message: image
            })

        } catch (err) {
            
            return res.status(500).json({
                response:false,error:true,
                message:err
            })
        }

    }




    static single = async(req,res)=>{
        try {
            const {table} = req.params
            const {file} = req
            if(file){
                //console.log(file);
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



}
export {UploadController}