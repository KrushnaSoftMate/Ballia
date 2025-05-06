const { CreatePermitBill, GetPermit, getpermitbyid } = require("../../controllers/admin/index")

const app = require('express').Router()
const { MiddleCheck } = require('../../Middleware/admin/MiddleWare')
const { Permituplaodregiester } = require('../../helper/Multer/AdminDocs')
app.post("/CreatePermitBill", MiddleCheck, Permituplaodregiester.array("PermitDocs", 10), CreatePermitBill)
app.get('/GetPermit', GetPermit)
app.post('/getpermitbyid', getpermitbyid)

module.exports = app