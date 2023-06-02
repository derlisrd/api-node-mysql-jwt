export const found = (results)=>({ first: results[0][0], found: results[0].length, response:true,error:false,results: results[0]})

export const foundok = (e,code=0)=> ({error:false,response:true,message: e,code})

export const notfound = (e,code=0)=> ({error:true,response:false,message: e,code})

export const notfoundNone = (message,code=0)=> ({error:true,response:false,message,found:0,code})

    