
import {conexion} from '../Database/Connect.js'
import { notfound } from './ResponseController.js'

export class GetController {
    static findAll = async(req,res)=>{
        try {        
            let {table} = req.params
            let fields= '*'
            let size = parseInt(req.query.size ?? 60)
            let page = parseInt(req.query.page ?? 0)
            let where = 'where 1 '
            let sort = ''
            
            if(req.query.fields){
                 fields = req.query.fields
            }
            if(req.query.where){
                let splitWhere =   (req.query.where).split(',')
                if(!splitWhere || splitWhere.length<3){
                    return res.status(401).json(notfound('There are errors with where'))
                }
                where = 'where '
                splitWhere.forEach(elm=>{
                    where += `${elm}`
                })
            }
            if(req.query.include && req.query.on){
              let include = req.query.include.split(',')
              let on = req.query.on.split(',')
              let i = 0;
              include.forEach(elm=>{
                table += ','+elm
                where +=' and '+ on[i]+'='+on[i+1]
                i+=2
              })
            }
            if(req.query.sort){
                let splitSort = (req.query.sort).split(',')
                if(!splitSort){
                    return res.status(401).json(notfound('There are errors with sort'))
                }
                sort += 'ORDER BY '+splitSort[0]+' '+splitSort[1]
                //return res.json({sort,length: spliteo.length})
            }
            let valores = [page,size]
            let sql = `SELECT ${fields} FROM ${table} ${where} ${sort} LIMIT ?,?;`
            let query = await conexion.query(sql,valores);    
            return res.status(200).json({
                found: query[0].length,
                response:true,
                error:false,
                first: query[0][0],
                results:query[0]
            })
        } catch (e) {
            return res.status(401).json(notfound(e))
        }
    }

    static findOne = async(req,res)=>{

    
        try {        
            let {table,id} = req.params
            let fields= '*'    
            if(req.query.fields){
                 fields = req.query.fields
            }
            let id_table = 'id_'+table.substring(0, table.length-1)

            let sql = `SELECT ${fields} FROM ${table} WHERE ${id_table} = ?  LIMIT 1;`
            let query = await conexion.query(sql,[id]);    
            return res.status(200).json({
                found: query[0].length,
                response:true,
                error:false,
                first: query[0][0],
                results:query[0]
            })
        } catch (e) {
            return res.status(401).json(notfound(e))
        }
    }

    static notFound = (req,res)=>{
        return res.status(404).json({response:false,error:true,message:'Not found.'})
    }

}



