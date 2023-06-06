import fs from 'fs'
import multer, { diskStorage } from "multer";
import { ENV } from "../App/config.js";

const PATH_STORAGE = `${process.cwd()}/`+ENV.UPLOAD_PATH;
const dir = './'+ENV.UPLOAD_PATH

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

const storage = diskStorage({
  destination(req, file, cb) {
    cb(null, PATH_STORAGE);
  },
  filename(req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const fileNameRandom = `${Date.now()}.${ext}`;
    cb(null, fileNameRandom);
  },
});

const multerMiddleware = multer({ storage });

const singleUpload = multerMiddleware.single('image')

export default singleUpload;