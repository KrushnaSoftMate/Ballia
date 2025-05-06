const app = require('express').Router()
const {PayBill,GetPaymentToken,CashPayBill,GetPaymentTokenForLicense,PayLicenseBill,LicenseCashPayBill} = require('../../controllers/Agent/index')
const {MiddleCheck,LimitCheck} = require('../../Middleware/agent/Middleware')

app.post('/PayBill',MiddleCheck,LimitCheck,PayBill)
app.post('/GetPaymentToken',MiddleCheck,LimitCheck,GetPaymentToken)
app.post('/CashPayBill',MiddleCheck,LimitCheck,CashPayBill)
app.post('/GetPaymentTokenForLicense',MiddleCheck,LimitCheck,GetPaymentTokenForLicense)
app.post('/PayLicenseBill',MiddleCheck,LimitCheck,PayLicenseBill)
app.post('/LicenseCashPayBill',MiddleCheck,LimitCheck,LicenseCashPayBill)

module.exports = app