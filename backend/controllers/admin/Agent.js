const connection = require("../../database/db")

function CreateAgent(req, res) {
    const { AgentID, FullName, ContactNumber, Email, Password, RoleID, Role, Moneylimit, Address, AadharNumber, PanNumber } = req.body;
    const query = "insert into agentlogin (AgentID,FullName,ContactNumber,Email,Password,RoleID,Role,Moneylimit,Address,AadharNumber,PanNumber) values (?,?,?,?,?,?,?,?,?,?,?)"
    connection.query(query, [AgentID, FullName, ContactNumber, Email, Password,  '1', 'Agent', Moneylimit, Address, AadharNumber, PanNumber], (error, result) => {
        if (result) {
            res.status(200).json(result)
            console.log(result);
        } else {
            console.log(error)
            res.status(404).json(error)
        }
    })

}

function GetAgent(req, res) {
    const query = "select * from agentlogin"
    connection.query(query, (error, result) => {
        if (result) {
            res.status(200).json(result)
            console.log(result);
        } else {
            res.status(404).json(error)

        }
    })
}

function UpdateAgent(req, res) {
    const { AgentID, FullName, ContactNumber, Email, Password, RoleID, Role,Moneylimit,Address,AadharNumber,PanNumber,ID } = req.body;
    console.log(req.body);
    const query = "update agentlogin set AgentID=?, FullName=?, ContactNumber=?, Email=?,Password=?, RoleID=?, Role=?,Moneylimit=?,Address=?,AadharNumber=?,PanNumber=? where ID=?"
    connection.query(query, [AgentID, FullName, ContactNumber, Email, Password, RoleID, Role,Moneylimit,Address,AadharNumber,PanNumber,ID ], (error, result) => {
        if (result) {
            res.status(200).json(result)
            console.log(result);
        } else {
            res.status(404).json(error)
            console.log(error);
        }
    })
}

module.exports = { CreateAgent, GetAgent, UpdateAgent }