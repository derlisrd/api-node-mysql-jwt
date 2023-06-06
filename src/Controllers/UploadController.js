

const UploadController = async(req,res)=>{
    try {
        res.send(req.file)
    } catch (e) {
        return res.status(500).json({
            response:false,
            error:true,
            message:e
        })
    }
}
export {UploadController}