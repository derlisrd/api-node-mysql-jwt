import express from "express";
import fileUpload from "express-fileupload";
import cors from 'cors'
import router from "./Routes/api.js";
import { ENV } from "./App/config.js";
import apikey from "./Middleware/apikey.js";

const app = express()
app.use(cors({origin:'*'}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))



//images
app.use(fileUpload())
app.use('/uploads/img/', express.static(ENV.UPLOAD_PATH));

//principal
app.use('/', apikey, router)



const PORT = ENV.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server ready on port http://localhost:${PORT}`);
})
