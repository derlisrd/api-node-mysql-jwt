
import {conexion} from '../Database/Connect.js'

export const GetController = async(req,res)=>{

    const {table} = req.params

    try {        
        let fields= req.query.fields ?? '*'
        let size = req.query.size ?? '60'
        let page = req.query.page ?? '0'
        let where = 'WHERE 1'
        if(req.query.where){
            let spliteo =   (req.query.where).split(',')
            where = 'where '
            spliteo.forEach(elm=>{
                where += `${elm}`
            })
        }
        let sql = `SELECT ${fields} FROM ${table} ${where} LIMIT ${page},${size};`
        let query = await conexion.query(sql);    
        return res.status(200).json({
            found: query[0].length,
            response:true,
            error:false,
            first: query[0][0],
            results:query[0]
        })
    } catch (e) {
        return res.status(404).json({
            error:true,
            response:false,
            message: e
        })
    }
}



