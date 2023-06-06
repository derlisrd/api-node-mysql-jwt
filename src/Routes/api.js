import { Router } from "express";
import { GetController } from "../Controllers/GetController.js";
import { AuthController } from "../Controllers/AuthController.js";
import { PostController } from "../Controllers/PostController.js";
import { PutController } from "../Controllers/PutController.js";
import { DeleteController } from "../Controllers/DeleteController.js";
import { UserController } from "../Controllers/UsersController.js";
import {UploadController} from "../Controllers/UploadController.js";
import auth from "../Middleware/auth.js";
//import singleUpload from "../Middleware/multerMiddleware.js";

const router = Router()

router.get('/',GetController.notFound)

router.post('/auth/login',AuthController.login);
router.post('/auth/register',AuthController.register);
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

//router.post('/upload/image/:table?',auth,singleUpload,UploadController.single)
router.post('/upload/image/:table?',auth,UploadController.singleImage)

export default router;