import express from "express";
import router from "./src/Routes/api.js";
import { ENV } from "./src/App/config.js";

const app = express()


app.use(router)

app.listen(ENV.PORT || 3000,()=>{
    //console.log('SERVER ON PORT 3000');
})
