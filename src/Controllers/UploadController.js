//import fileUpload from "express-fileupload";
import multer from "multer";

class UploadController{
    
    static simple = async(req,res)=>{

        try {
            

        } catch (e) {
            return res.status(500).json({
                response:false,
                error:true,
                message:e
            })
        }

        
    }
    

}

export default UploadController;