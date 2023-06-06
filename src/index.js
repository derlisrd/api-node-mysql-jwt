import express from "express";
import router from "./Routes/api.js";
import { ENV } from "./App/config.js";
import cors from 'cors'
import apikey from "./Middleware/apikey.js";
//import fileUpload from "express-fileupload";

const app = express()
app.use(cors({origin:'*'}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
//app.use(fileUpload)

//images
app.use('/img/', express.static(ENV.UPLOAD_PATH));

//principal
app.use('/', apikey, router)



const PORT = ENV.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server ready on port http://localhost:${PORT}`);
})
