const { Login, GetMenus } = require('./Admin')
const { CustomerManagement, BulkBillGeneration, GetCustomer, BillCalculation, BillCreation, UpdateBill, GetCustomerData, GetCustomerBillData, GetCustomerList, CustomerListUpload, Approvals, BulkApprovals, CustomerUpdateBill, BulkBillDownload, UpdateCustomer, CheckGenerationProcess } = require('./CustomerManagement')
const { CustomerForm, GetCordinatesOnStart, GetCordinates, FetchFolderName, LocalityRate, PropertyRate } = require('./HelperApi')
const { GenerateHash, BillPayment, BillWhatsappPayment, confirmpayment, PermitGenerateHash, PermitBillPayment, CashPayBill, ApplyDiscount, GenerateLicenseHash, LicenseBillPayment, CashHash } = require('./CustomerPayment')
const { LocalityRates, SetLocalityRates, DocumentsType, SetDocumentType, deleteDocumenttype, LocalityTypes, SetLocalityTypes, TaxType, SetTaxType, deletetaxtype, PropertyTypes, addPropertyType, deletePropertyType, PermitTypes, AddPermitType, DisablePermitType, DiscountType, SetDiscountType, deleteRatetype } = require('./Master')
const { CreateEmployee, EditRole, Roles } = require('./EmployeeManagement')
const { DashboardReport, DashboardChartForZone, DashboardChartForWard, DashboardChartForTotals, DashboardChartForToday, CustomerReport, TransactionReports, NoticeofdemandReports, DashboardChart } = require('./Reports')
const { CreatePermitBill, GetPermit, getpermitbyid } = require('./ChalanManagement')
const { CreateAgent, GetAgent, UpdateAgent } = require("./Agent")
const { CreateLicense, GetLicenseBill, LicenceApprovals } = require("./LicenseManagement")

module.exports = {
    CheckGenerationProcess,
    ApplyDiscount, GetLicenseBill,
    CustomerUpdateBill, DashboardChartForZone, DashboardChartForWard, DashboardReport, DashboardChartForTotals, DashboardChartForToday, LocalityRates, SetLocalityRates, DocumentsType, SetDocumentType, deleteDocumenttype, LocalityTypes, SetLocalityTypes, TaxType, SetTaxType, deletetaxtype, PropertyTypes, addPropertyType, deletePropertyType, PermitTypes, AddPermitType, DisablePermitType, confirmpayment, BillWhatsappPayment, GetCustomerData, GetCustomerBillData, GetCordinatesOnStart, GetCordinates, Login, GetMenus, CustomerManagement, GetCustomer, CustomerForm, BillCalculation, BillCreation, GenerateHash, BillPayment, UpdateBill,
    CreateEmployee, EditRole, Roles, GetCustomerList, CustomerListUpload, Approvals, BulkBillGeneration, BulkBillDownload, UpdateCustomer, CreatePermitBill, GetPermit, getpermitbyid, CreateAgent, GetAgent, UpdateAgent, PermitGenerateHash, PermitBillPayment, CashPayBill, FetchFolderName, GenerateLicenseHash, LicenseBillPayment, DiscountType, SetDiscountType, CreateLicense, CustomerReport, TransactionReports, CashHash, deleteRatetype, LocalityRate, PropertyRate, BulkApprovals, NoticeofdemandReports, LicenceApprovals, DashboardChart
}

