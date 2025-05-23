const express = require("express")
const app = express.Router()
const { GetBill, ViewBill, CustomerDetails, BillHistory, GetPermitBill, GetReciept, GetPermitReciept, GetLicenseBill, Signup, Login, sendotp, verifyOtp, GetLicenseDetails } = require("../../controllers/Customer/index")
const { MiddleCheck } = require("../../Middleware/citizen/MiddleWare")

app.post("/GetBill", GetBill)
app.post("/ViewBill", ViewBill)
app.post("/CustomerDetails", CustomerDetails)
app.post("/BillHistory", BillHistory)
app.post("/GetPermitBill", GetPermitBill)
app.post("/GetReciept", GetReciept)
app.post("/GetPermitReciept", GetPermitReciept)
app.post("/GetLicenseBill", GetLicenseBill)
app.post("/Signup", Signup)
app.post("/Login", Login)
app.post("/sendotp", sendotp)
app.post("/verifyOtp", verifyOtp)
app.post("/GetLicenseDetails", GetLicenseDetails)

module.exports = app