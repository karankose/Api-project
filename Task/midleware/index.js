const fs = require('fs');


function logReq (filename){
    return (req , res , next )=>{
        const date = `${Date.now()} : ${req.method} ${req.path}`;
       fs .appendFile(filename ,date,(err, res)=>{
        next();
       })
    }
}

logReq('./txt')

module.exports = {
    logReq
}