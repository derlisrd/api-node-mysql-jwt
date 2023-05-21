import { Router } from "express";
import { GetController } from "../Controllers/GetController.js";
import { LoginController,RegisterController } from "../Controllers/AuthController.js";


const router = Router()

router.post('/auth/login',async(req,res)=>{ await LoginController(req,res)});
router.post('/auth/register',async(req,res)=>{ await RegisterController(req,res)});

router.get('/:table',async(req,res)=>{await GetController(req,res)})


export default router;