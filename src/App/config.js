//require('dotenv').config()
//import { config } from "dotenv"
import * as dotenv from 'dotenv'
dotenv.config()

export const ENV = {
    PORT:process.env.PORT,
    DATABASE: process.env.DB_NAME,
    USER: process.env.DB_USER,
    PASS:process.env.DB_PASS,
    HOST: process.env.HOST,
    SECRET_JWT: process.env.SECRET_JWT,
    SECRET_JWT_REFRESH: process.env.SECRET_JWT_REFRESH,
    X_API_KEY: process.env.X_API_KEY,
    TOKEN_EXPIRED_MINUTES: process.env.TOKEN_EXPIRED_MINUTES
}

