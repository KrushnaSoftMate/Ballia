const { CreatePermitBill, GetPermit, getpermitbyid, AgentProfile, GetPermitBill, UpdatePermitBill,GetTransactionHistory } = require("../../controllers/Agent/index")

const app = require('express').Router()
const { MiddleCheck } = require('../../Middleware/agent/Middleware')
const { Permituplaodregiester } = require('../../helper/Multer/AdminDocs')
app.post("/CreatePermitBill", MiddleCheck, Permituplaodregiester.array("PermitDocs", 10), CreatePermitBill)
app.get('/GetPermit', GetPermit)
app.post('/getpermitbyid', getpermitbyid)
app.get('/AgentProfile', MiddleCheck, AgentProfile)
app.post('/GetPermitBill', MiddleCheck, GetPermitBill)
app.post('/UpdatePermitBill', MiddleCheck,Permituplaodregiester.array("PermitDocs", 10), UpdatePermitBill)
app.post('/GetTransactionHistory',MiddleCheck,GetTransactionHistory)

module.exports = app