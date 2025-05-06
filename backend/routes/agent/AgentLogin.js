const app = require('express').Router()

const {Login,GetMenus} = require('../../controllers/Agent/index')
const {MiddleCheck} = require('../../Middleware/agent/Middleware')

app.post('/Login',Login)
app.get('/GetMenus',MiddleCheck,GetMenus)

module.exports = app