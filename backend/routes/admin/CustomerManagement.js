const { CheckGenerationProcess, CustomerManagement, GetCustomer, CustomerListUpload, BulkBillGeneration, BillCalculation, BillCreation, UpdateBill, GetCustomerData, GetCustomerBillData, GetCustomerList, Approvals, CustomerUpdateBill, BulkBillDownload, UpdateCustomer, BulkApprovals } = require('../../controllers/admin/index')
const { spawn } = require('child_process');
const app = require('express').Router()
const { MiddleCheck } = require('../../Middleware/admin/MiddleWare');
const { MiddleCheck: CitizenCheck } = require('../../Middleware/citizen/MiddleWare');

const { Customeregister, exceluplaod } = require('../../helper/Multer/AdminDocs')
const { getzip } = require('../../helper/util/bulkpdf')
app.post('/CustomerManagement', Customeregister.array('CustomerDocs', 10), CustomerManagement)
app.post('/UpdateCustomer', MiddleCheck, Customeregister.array('CustomerDocs', 10), UpdateCustomer)
app.post("/getCustomer", MiddleCheck, GetCustomer)
app.post("/BillCalculation", MiddleCheck, BillCalculation)
app.post("/BillCreation", MiddleCheck, BillCreation)
app.post("/UpdateBill", MiddleCheck, UpdateBill)
app.post("/CustomerUpdateBill", MiddleCheck, CustomerUpdateBill)
app.post("/GetCustomerData", MiddleCheck, GetCustomerData)
app.post("/GetCustomerBillData", MiddleCheck, GetCustomerBillData)
app.post("/GetCustomerList", MiddleCheck, GetCustomerList)
app.post("/CustomerListUpload", exceluplaod.single("CSV"), CustomerListUpload)
app.post("/Approvals", MiddleCheck, Approvals)
app.post("/BulkApprovals", MiddleCheck, BulkApprovals)
app.post("/BulkBillGeneration", MiddleCheck, BulkBillGeneration)
app.post('/getzip', MiddleCheck, getzip)
app.post("/BulkBillDownload", MiddleCheck, BulkBillDownload)
app.get('/CheckGenerationProcess', MiddleCheck, CheckGenerationProcess)
module.exports = app
