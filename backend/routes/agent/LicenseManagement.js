const { CreateLicense, GetCustomerLicense,GetGalaDetails,CreateLicenseBill,GetLicenseDetails,GetLicenseBill,GetLicenseTransactionHistory } = require('../../controllers/Agent/index')
const app = require('express').Router()
const { MiddleCheck } = require('../../Middleware/agent/Middleware')
const { Permituplaodregiester } = require('../../helper/Multer/AdminDocs')
app.post("/CreateLicense", Permituplaodregiester.array("PermitDocs", 10), CreateLicense)
app.post("/GetCustomerLicense", GetCustomerLicense)
app.post("/CreateLicenseBill", CreateLicenseBill)
app.get('/GetLicenseDetails',GetLicenseDetails)
app.post('/GetLicenseBill',GetLicenseBill)
app.post('/GetLicenseTransactionHistory',GetLicenseTransactionHistory)
app.post('/GetGalaDetails',GetGalaDetails)

module.exports = app