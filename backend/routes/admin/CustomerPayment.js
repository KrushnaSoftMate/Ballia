const { GenerateHash, BillPayment,ApplyDiscount, BillWhatsappPayment, confirmpayment, PermitGenerateHash, PermitBillPayment ,CashPayBill,GenerateLicenseHash,LicenseBillPayment,CashHash} = require('../../controllers/admin/index')
const app = require('express').Router()
const { MiddleCheck } = require('../../Middleware/admin/MiddleWare')

app.post('/GenerateHash', GenerateHash)
app.post('/BillPayment', BillPayment)
app.post('/BillWhatsappPayment', BillWhatsappPayment)
app.post('/confirmpayment', confirmpayment)
app.post('/PermitGenerateHash', PermitGenerateHash)
app.post('/PermitBillPayment', PermitBillPayment)
app.post('/CashPayBill',MiddleCheck, CashPayBill)
app.post('/ApplyDiscount',ApplyDiscount)
app.post('/GenerateLicenseHash',GenerateLicenseHash)
app.post('/LicenseBillPayment',LicenseBillPayment)
app.post('/CashHash',MiddleCheck,CashHash)

module.exports = app
