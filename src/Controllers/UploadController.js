//import fileUpload from "express-fileupload";
import multer from "multer";

class UploadController{
    
    static simple = async(req,res)=>{
        //fileUpload({createParentPath:true})
        const fileStorage = multer.diskStorage({
            destination: (req,file,cb)=>{
                cb(null,'../images')
            },
            filename:(req,file,cb)=>{
                cb(null,Date.now() + '--'+ file.originalname)
            }
        })
        const upload = multer({storage: fileStorage})

        upload.single('image')
    }
    

}

export default UploadController;