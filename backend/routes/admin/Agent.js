const app = require("express").Router()

const { CreateAgent, GetAgent,UpdateAgent } = require("../../controllers/admin/index")
const { MiddleCheck } = require("../../Middleware/admin/MiddleWare")

app.post('/CreateAgent', MiddleCheck, CreateAgent)
app.get('/GetAgent', MiddleCheck, GetAgent)
app.post('/UpdateAgent', MiddleCheck, UpdateAgent)

module.exports = app