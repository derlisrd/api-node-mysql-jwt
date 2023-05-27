import { Router } from "express";
import { GetController } from "../Controllers/GetController.js";
import { AuthController } from "../Controllers/AuthController.js";
import { PostController } from "../Controllers/PostController.js";
import { PutController } from "../Controllers/PutController.js";
import { DeleteController } from "../Controllers/DeleteController.js";
import auth from "../Middleware/auth.js";
import { UserController } from "../Controllers/UsersController.js";


const router = Router()

router.post('/auth/login',AuthController.login);
router.post('/auth/register',AuthController.register);
router.post('/auth/checktoken',AuthController.checkToken);
router.post('/auth/refreshtoken',AuthController.refreshToken);
router.get('/users',auth,UserController.getAll)

router.post('/:table',auth,PostController)

router.put('/:table/:id',auth,PutController)

router.delete('/:table/:id',auth,DeleteController)

router.get('/:table',auth, GetController)
router.get('/:table/:id',auth,GetController)


export default router;