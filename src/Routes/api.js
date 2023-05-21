import { Router } from "express";
import { GetController } from "../Controllers/GetController.js";
import { LoginController } from "../Controllers/AuthController.js";


const router = Router()

router.post('/auth/login',async(req,res)=>{ await LoginController(req,res)});

router.get('/:table',async(req,res)=>{await GetController(req,res)})


export default router;