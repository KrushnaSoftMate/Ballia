const { CustomerManagement,GetCustomer,GetCustomerList } = require("../../controllers/Agent/index")
const app = require('express').Router()
const { MiddleCheck } = require('../../Middleware/agent/Middleware')
const {Customeregister,exceluplaod}=require('../../helper/Multer/AdminDocs')
app.post('/CustomerManagement',MiddleCheck,Customeregister.array('CustomerDocs',10),CustomerManagement)
app.post('/getCustomer',MiddleCheck,GetCustomer)
app.post('/GetCustomerList',MiddleCheck,GetCustomerList)
module.exports = app