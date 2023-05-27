export const found = (results)=>({ first: results[0][0], found: results[0].length, response:true,error:false,results: results[0]})

export const foundok = (e)=> ({error:false,response:true,message: e})

export const notfound = (e)=> ({error:true,response:false,message: e})

export const notfoundNone = (message)=> ({error:true,response:false,message,found:0})

    