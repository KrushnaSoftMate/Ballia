const {CreateEmployee,EditRole,Roles}=require('../../controllers/admin/index')
const app=require('express').Router()
const {MiddleCheck}=require('../../Middleware/admin/MiddleWare')
app.post('/CreateEmployee',MiddleCheck,CreateEmployee)
app.post('/EditRole',MiddleCheck,EditRole)
app.post('/Roles',MiddleCheck,Roles)

module.exports=app