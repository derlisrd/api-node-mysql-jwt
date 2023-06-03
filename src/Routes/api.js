import { Router } from "express";
import { GetController } from "../Controllers/GetController.js";
import { AuthController } from "../Controllers/AuthController.js";
import { PostController } from "../Controllers/PostController.js";
import { PutController } from "../Controllers/PutController.js";
import { DeleteController } from "../Controllers/DeleteController.js";
import auth from "../Middleware/auth.js";
import { UserController } from "../Controllers/UsersController.js";
import apikey from "../Middleware/apikey.js";


const router = Router()

router.get('/',apikey,GetController.notFound)

router.post('/auth/login',apikey,AuthController.login);
router.post('/auth/register',apikey,AuthController.register);
router.post('/auth/checktoken',AuthController.checkToken);
router.post('/auth/refreshtoken',AuthController.refreshToken);
router.get('/users',auth,UserController.getAll)
router.get('/users/:id',auth,UserController.findOne)
router.put('/users/:id',auth,UserController.update)
router.put('/users/password/:id',UserController.updatepassword)

router.post('/:table',auth,PostController)

router.put('/:table/:id',auth,PutController)

router.delete('/:table/:id',auth,DeleteController)

router.get('/:table',auth, GetController.findAll)
router.get('/:table/:id',auth,GetController.findOne)


//router.post('/upload',auth,)

export default router;