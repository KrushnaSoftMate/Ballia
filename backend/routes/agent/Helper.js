const { AgentCustomerForm,LocalityRate,PropertyRate } = require('../../controllers/Agent/index')
const app = require('express').Router()
const { MiddleCheck } = require('../../Middleware/agent/Middleware')
app.get('/CustomerForm', MiddleCheck, AgentCustomerForm)
app.post('/LocalityRate', MiddleCheck, LocalityRate)
app.post('/PropertyRate', MiddleCheck, PropertyRate)
module.exports = app