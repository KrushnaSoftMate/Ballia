const { CreateLicense ,GetLicenseBill,LicenceApprovals} = require('../../controllers/admin/index')
const app = require('express').Router()
const { MiddleCheck } = require('../../Middleware/admin/MiddleWare')
const { Permituplaodregiester } = require('../../helper/Multer/AdminDocs')
app.post("/CreateLicense", MiddleCheck, Permituplaodregiester.array("PermitDocs", 10), CreateLicense)
app.post('/GetLicenseBill',MiddleCheck,GetLicenseBill)
app.post('/LicenceApprovals',MiddleCheck,LicenceApprovals)
module.exports = app