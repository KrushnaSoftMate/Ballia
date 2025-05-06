const connection = require('../../database/db')
const {GenerateToken} = require("../../jwt/agent/JWTToken")

function Login(req,res){
   const{Email,Password}=req.body
   const query="SELECT * FROM agentlogin Where Email=? and Binary Password=?"
   connection.query(query, [Email, Password], (err, result) => {
    if (result) {
        if (result?.length > 0) {
            console.log(result)
            const token = GenerateToken(JSON.stringify(result[0]))
            res.status(200).json({token:token,AgentDetails:result[0]})    
        } else {
            res.status(404).json(err)
        }
    } else {
        res.json(err)
        console.log(err);
    }
})
}

function GetMenus(req, res) {
    let data=req.AgentDetails;

    let RoleID=''+data.RoleID
    const query = "SELECT * FROM agentmenu WHERE JSON_CONTAINS(Access_Role,?)"
    connection.query(query,[RoleID],(error, results) => {
        if (results) {
            res.json(results)
          
        } else {
            res.json(error) 
            console.log(error);
        }
    })
}


module.exports={Login,GetMenus}