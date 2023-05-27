import {conexion} from '../Database/Connect.js'


export const PostController = async(req,res)=>{

    const {table} = req.params
    const {body} = req
    
    
    try {
        let campos = Object.keys(body).toString();
        let valores = Object.values(body);
        let interrogates = ''
        valores.forEach(()=>{interrogates += '?, '})
        interrogates = interrogates.substring(0, interrogates.length -2);
        let sql = `INSERT INTO ${table} (${campos}) VALUES (${interrogates});`
        let resultInsert = await conexion.query(sql,valores);
        return res.status(200).json({
            response:true, error:false,
            message:"Inserted!", 
            last_id: resultInsert[0].insertId
        })
    }
    catch (e) {
        return res.status(500).json({
            error:true,
            response:false,
            message: e
        })
    }
}