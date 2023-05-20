import connect from "../Database/Connect.js";


export const GetQuery = async()=>{
    try {
        const result = await Connect.query('select * from users')
        return result
    } catch (error) {
        return error
    }
}




