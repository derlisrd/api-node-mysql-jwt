import { Router } from "express";
import { GetController } from "../Controllers/GetController.js";
import { AuthController } from "../Controllers/AuthController.js";


const router = Router()

router.post('/auth/login',AuthController.login);
router.post('/auth/register',AuthController.register);

router.get('/:table',GetController)
router.get('/:table/:id',GetController)


export default router;