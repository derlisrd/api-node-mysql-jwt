import {createPool} from 'mysql2/promise.js'
import { ENV } from '../App/config.js'

export const conexion  = createPool({
    database:ENV.DATABASE,
    host:ENV.HOST,
    user:ENV.USER,
    password:ENV.PASS
})

