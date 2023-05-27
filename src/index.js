import express from "express";
import router from "./Routes/api.js";
import { ENV } from "./App/config.js";
import cors from 'cors'

const app = express()
app.use(cors({origin:'*'}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',router)

const PORT = ENV.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server ready on port: ${PORT}`);
})
