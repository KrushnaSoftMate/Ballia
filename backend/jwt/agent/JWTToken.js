const JWT=require('jsonwebtoken')
const scretkey=process.env.AgentKey

function GenerateToken(data) {
    let Obj=JSON.parse(data)
    const token=JWT.sign(Obj,scretkey)
    return token
}



function VerifyToken(data) { 
    try {
        const token=JWT.verify(data,scretkey)
        if(token){
            return token
        }
        else{
            return false
        }
    } catch (error) {
        return false
    }

}

module.exports={GenerateToken,VerifyToken}