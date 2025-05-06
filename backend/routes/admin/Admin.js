const { Login, GetMenus } = require('../../controllers/admin/index')
const app = require('express').Router()
const { MiddleCheck } = require('../../Middleware/admin/MiddleWare')
app.post('/Login', Login)
app.get("/GetMenus", MiddleCheck, GetMenus)


module.exports = app 