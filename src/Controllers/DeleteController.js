import { conexion } from "../Database/Connect.js";

export const DeleteController = async(req,res)=>{


    
    const {table,id} = req.params

    try {
        
        let id_table = 'id_'+table.substring(0, table.length-1)
        
        let sql = `DELETE FROM ${table} WHERE ${id_table} = ?;`
        await conexion.query(sql,[id]);
        return res.status(200).json({
            response:true, error:false,
            message:"Deleted!",
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