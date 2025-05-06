const aes256=require('aes256')
function GlobalMiddleWare(req,res,next) {
    const connection = require('../database/db')
    let header=req.header('CheckerKey')
    let parsedheader=header?JSON.parse(header):false
    if (parsedheader) {
        connection.query('SELECT * FROM `systemcontrol` WHERE `PublicKey`=?',['sklaj$jak389&^%$#@'],(err,result)=>{
            if (result.length>0) {
                let decryption=aes256.decrypt(result[0].Passkey ,parsedheader.keyaccess)
                if (decryption==result[0].SystemEncryption) {
                    next()
                }
                else{
                    res.status(404).json('You cannot access')
                }
           
            }
            else{
               console.log(err)
               res.status(500).json('You cannot access') 
            }
        })
    }
    else{
        res.status(404).json('You cannot access')
    }

    


}



module.exports=GlobalMiddleWare