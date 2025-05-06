"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { apiurl, frontend, backend } from "../paths";
import aes256 from "aes256";
const CryptoJS = require('crypto-js');

export const Admin = createContext();

export const AdminManageMent = (props) => {
  let token;
  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("AuthUser");
  }
  const [hey, sethey] = useState();

  function EncryptionKey() {
    let keyaccess = aes256.encrypt('#$@!#$%Vinay%$#@Tandale)(*#$(', 'SystemAppliactionOKay')
    const obj = {
      keyaccess: keyaccess
    }
    return JSON.stringify(obj)
  }

  function encryptData(data, key) {
    return CryptoJS.AES.encrypt(data, key).toString();
  }

  function encryptData1(data, key) {
    // Convert the data object to a JSON string
    const dataString = JSON.stringify(data);
    return CryptoJS.AES.encrypt(dataString, key).toString();
  }

  async function GetDocumentForm() {
    let CheckerKey = EncryptionKey()
    console.log(CheckerKey);
    let data = await fetch(`${backend}/HelperApi/CustomerForm`, {
      method: "GET",

      headers: { "CheckerKey": CheckerKey },
    });
    data = await data.json();
    return data;
  }

  async function GetCordinates(formdata) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/HelperApi/GetCordinates`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({ formdata })
    });
    data = await data.json();
    return data;
  }

  async function GetCordinatesOnStartup() {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/HelperApi/GetCordinatesOnStart`, {
      method: "GET",
      headers: { "CheckerKey": CheckerKey, Auth: token },
    });
    data = await data.json();
    return data;
  }

  async function FindCustomer(ConsumerNumber) {

    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Customer/getCustomer`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({
        ConsumerNo: ConsumerNumber,
      }),
    });
    data = await data.json();
    return data;
  }

  async function GetCustomerData(ConsumerNumber) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Customer/GetCustomerData`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({
        ConsumerNo: ConsumerNumber,
      }),
    });
    data = await data.json();
    return data;
  }

  async function GetCustomerBillData(ConsumerNumber) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Customer/GetCustomerBillData`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({
        ConsumerNo: ConsumerNumber,
      }),
    });
    data = await data.json();
    return data;
  }

  async function GetCustomerList(formdata) {
    console.log("formdata", formdata)
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Customer/GetCustomerList`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({
        ...formdata
      }),
    });
    data = await data.json();
    // console.log(data);

    return data;
  }

  async function GenerateBill(ConsumerNumber) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Customer/BillCalculation`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({
        ConsumerNo: ConsumerNumber,
      }),
    });
    data = await data.json();
    return data;
  }
  async function GetMenus(params) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Admin/GetMenus`, {
      method: "GET",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
    });
    data = await data.json();
    return data;
  }
  async function CreateBill(obj, dyanamicgem) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Customer/BillCreation`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({ ...obj, dyanamicgem: dyanamicgem }),
    });
    data = await data.json();
    return data;
  }
  async function UpdateBill(ConsumerNumber, type) {
    let CheckerKey = EncryptionKey()
    if (type == "getdata") {
      let data = await fetch(`${backend}/Customer/UpdateBill`, {
        method: "POST",
        headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
        body: JSON.stringify({
          BillNumber: ConsumerNumber,
          type: type,
        }),
      });
      data = await data.json();
      return data;
    } else {
      let data = await fetch(`${backend}/Customer/UpdateBill`, {
        method: "POST",
        headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
        body: JSON.stringify({
          ...ConsumerNumber,
          type: type,
        }),
      });
      data = await data.json();
      return data;
    }
  }

  async function CustomerUpdateBill(ConsumerNumber, dynamicdata) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Customer/CustomerUpdateBill`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({
        ...ConsumerNumber
        , dynamicdata: dynamicdata
      }),
    })
    data = await data.json();
    return data;
  }

  async function LocalityRates() {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Master/getlocalityrates`, {
      method: "GET",
      headers: { "CheckerKey": CheckerKey, Auth: token },
    });
    data = await data.json();
    return data;
  }

  async function AddLocalityRates(formlocalityrates) {
    let CheckerKey = EncryptionKey()
    if (formlocalityrates.type == "insert") {
      let data = await fetch(`${backend}/Master/setlocalityrates`, {
        method: "POST",
        headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
        body: JSON.stringify({ ...formlocalityrates }),
      });
      data = await data.json();
      return data;
    } else {
      let data = await fetch(`${backend}/Master/setlocalityrates`, {
        method: "POST",
        headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
        body: JSON.stringify({ ...formlocalityrates }),
      });
      data = await data.json();
      return data;
    }
  }

  async function DocumentsType() {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Master/getdocumenttype`, {
      method: "GET",
      headers: { "CheckerKey": CheckerKey, Auth: token },
    });
    data = await data.json();
    return data;
  }

  async function AddDocumentsType(documents) {
    let CheckerKey = EncryptionKey()
    if (documents.type == "insert") {
      let data = await fetch(`${backend}/Master/setdocumenttype`, {
        method: "POST",
        headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
        body: JSON.stringify({ ...documents }),
      })
      data = await data.json();
      return data;
    } else {
      let data = await fetch(`${backend}/Master/setdocumenttype`, {
        method: "POST",
        headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
        body: JSON.stringify({ ...documents }),
      })
      data = await data.json();
      return data;
    }
  }
  async function DeleteDocumentTypes(id) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Master/deleteDocumenttype`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({ id }),
    });
    data = await data.json();
    return data;
  }


  async function LocalityTypes() {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Master/getlocalitytypes`, {
      method: "GET",
      headers: { "CheckerKey": CheckerKey, Auth: token },
    });
    data = await data.json();
    return data;
  }

  async function AddLocalityTypes(locality) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Master/setlocalitytypes`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({ ...locality }),
    });
    data = await data.json();
    return data;
  }

  async function TaxType() {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Master/gettaxtype`, {
      method: "GET",
      headers: { "CheckerKey": CheckerKey, Auth: token },
    });

    data = await data.json();
    return data;
  }

  async function AddTaxTypes(tax, type) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Master/settaxtype`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({ ...tax, type: type }),
    });
    data = await data.json();
    return data;
  }

  async function DeleteTaxType(id) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Master/deletetaxtype`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({ id }),
    });
    data = await data.json();
    return data;
  }

  async function PropertyTypes() {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Master/getpropertytypes`, {
      method: "GET",
      headers: { "CheckerKey": CheckerKey, Auth: token },
    });
    data = await data.json();
    return data;
  }
  async function AddPropertyTypes(property, type) {
    console.log(property, type);
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Master/addPropertyType`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({ ...property, type: type }),
    });
    data = await data.json();
    console.log(data);
    return data;
  }

  async function DeletePropertyType(id) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Master/deletePropertyType`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({ id }),
    });
    data = await data.json();
    return data;
  }


  async function BillWhatsappPayment(HashkeyGen) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/CustomerPayment/BillWhatsappPayment`, {
      method: "POST",
      headers: ({ "CheckerKey": CheckerKey, "Content-Type": "application/json" }),
      body: JSON.stringify({ ...HashkeyGen }),
    });
    data = await data.json();
    return data;
  }

  async function confirmpayment(HashkeyGen) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/CustomerPayment/confirmpayment`, {
      method: "POST",
      headers: ({ "CheckerKey": CheckerKey, "Content-Type": "application/json" }),
      body: JSON.stringify({ ...HashkeyGen }),
    });
    data = await data.json();
    return data;
  }

  const EmployeeManagement = async (type, data) => {
    let CheckerKey = EncryptionKey()
    if (type === 'Create') {
      let Creation = await fetch(backend + '/EmployeeManagement/CreateEmployee', {
        method: 'post',
        headers: ({ "CheckerKey": CheckerKey, 'Content-Type': 'Application/json', 'Auth': token }),
        body: JSON.stringify({ ...data, type })
      })
      Creation = await Creation.json()
      if (Creation) {
        alert('Successfully Created')
        window.location.reload()
      }
      else {
        alert('failed Creation')
        window.location.reload()
      }
    }
    if (type === 'Update') {
      let Creation = await fetch(backend + '/EmployeeManagement/CreateEmployee', {
        method: 'post',
        headers: ({ "CheckerKey": CheckerKey, 'Content-Type': 'Application/json', 'Auth': token }),
        body: JSON.stringify({ ...data, type })
      })
      Creation = await Creation.json()
      if (Creation) {
        alert('Successfully Edited')
        window.location.reload()
      }
      else {
        alert('failed Edition')
        window.location.reload()
      }
    }
    else if (type === 'View') {
      let Creation = await fetch(backend + '/EmployeeManagement/CreateEmployee', {
        method: 'post',
        headers: ({ "CheckerKey": CheckerKey, 'Content-Type': 'Application/json', 'Auth': token }),
        body: JSON.stringify({ Searchparameter: data, type: "View" })
      })
      Creation = await Creation.json()
      return Creation
    }

  }

  const Roles = async (type, data, obj) => {
    let CheckerKey = EncryptionKey()
    if (type === 'View') {
      let Creation = await fetch(backend + '/EmployeeManagement/Roles', {
        method: 'post',
        headers: ({ "CheckerKey": CheckerKey, 'Content-Type': 'Application/json', 'Auth': token }),
        body: JSON.stringify({ type: 'View' })
      })

      Creation = await Creation.json()
      return Creation
    }
    else if (type === 'CreateRole') {
      let CheckerKey = EncryptionKey()
      let Creation = await fetch(backend + '/EmployeeManagement/Roles', {
        method: 'post',
        headers: ({ "CheckerKey": CheckerKey, 'Content-Type': 'Application/json', 'Auth': token }),
        body: JSON.stringify({ ...data, type: 'CreateRole', obj })
      })
      Creation = await Creation.json()
      if (Creation) {
        alert("Your Role has been Successfully Created")
      }
      return Creation
    }
  }

  const EditRoleActions = async (type, RoleID, menu, menuset) => {
    let CheckerKey = EncryptionKey()
    let Creation = await fetch(backend + '/EmployeeManagement/EditRole', {
      method: 'post',
      headers: ({ "CheckerKey": CheckerKey, 'Content-Type': 'Application/json', 'Auth': token }),
      body: JSON.stringify({ type: type, RoleID: RoleID, menu, menuset })
    })
    Creation = await Creation.json()
    if (Creation === true) {
      alert('Your Role Editation has been complete')
    }
    return Creation
  }

  async function CreateCustomer(uploadform) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(backend + '/Customer/CustomerManagement',
      { method: "POST", headers: ({ "CheckerKey": CheckerKey, }), body: uploadform })
    //   if (data.status > 300) {
    //     alert('customer not created')
    //   }
    //   else if (data.status === 201) {
    //     let responseData = await data.json(); // Parse the response body as JSON
    //     alert('Created customer with PropertyID: ' + responseData.PropertyID);
    // }
    let responseData = await data.json();
    return responseData
  }

  async function UpdateCustomer(uploadform) {
    try {
      let CheckerKey = EncryptionKey()
      let data = await fetch(backend + '/Customer/UpdateCustomer', { method: "POST", headers: ({ "CheckerKey": CheckerKey, "Auth": token }), body: uploadform })
      const result = await data.json();
      return result;
    }
    catch (err) {
      console.log(err);
    }
  }

  async function DashboardReports() {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Reports/DashboardReport`, {
      method: "GET",
      headers: { "CheckerKey": CheckerKey, Auth: token },
    });
    data = await data.json();
    return data;
  }

  async function DashboardChart(locality) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Reports/DashboardChart`, {
      method: "POST",
      headers: ({ "CheckerKey": CheckerKey, "Content-Type": "Application/json", "Auth": token }),
      body: JSON.stringify({ locality: locality })
    })
    data = await data.json()
    return data;
  }
  async function DashboardChartZone(createdOn, Zone, Ward) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Reports/DashboardChartForZone`, {
      method: "POST",
      headers: ({ "CheckerKey": CheckerKey, "Content-Type": "Application/json", "Auth": token }),
      body: JSON.stringify({ createdOn, Zone, Ward })
    })
    data = await data.json()
    return data
  }
  async function DashboardChartWard(createdOn, Ward) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Reports/DashboardChartForWard`, {
      method: "POST",
      headers: ({ "CheckerKey": CheckerKey, "Content-Type": "Application/json", "Auth": token }),
      body: JSON.stringify({ createdOn, Ward })
    })
    data = await data.json()
    return data
  }
  async function DashboardReportsForTotal() {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Reports/DashboardChartForTotals`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, Auth: token },
    });
    data = await data.json();
    return data;
  }
  async function DashboardReportsForToday() {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Reports/DashboardChartForToday`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, Auth: token },
    });
    data = await data.json();
    return data;
  }

  async function ApproveApplication(condition, customerid, remark) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Customer/Approvals`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({ condition: condition, customerid: customerid, remark: remark })
    });
    data = await data.json();
    return data;
  }

  async function BulkBillGeneration(form) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Customer/BulkBillGeneration`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({ ...form })
    })
    data = await data.json();
    return data;
  }

  async function BulkBillDownload(form) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Customer/BulkBillDownload`, {
      method: "Post",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({ ...form })
    })
    data = await data.json();
    return data;
  }

  async function GetPermitTypes() {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Master/GetPermitTypes`, {
      method: "GET",
      headers: { "CheckerKey": CheckerKey, Auth: token },
    });
    data = await data.json();
    return data;
  }

  async function AddPermitTypes(permitType) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Master/AddPermitType`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({ ...permitType }),
    });
    data = await data.json();
    return data;
  }

  async function DisablePermitType(id, newStatus) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Master/DisablePermitType`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({ id: id, newStatus }),
    });
    data = await data.json();
    return data;
  }



  async function GettoPermit() {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/HelperApi/CustomerForm`, {
      method: "GET",
      headers: { "CheckerKey": CheckerKey, Auth: token },
    });
    data = await data.json();
    return data;
  }

  async function CreatePermitBill(uploadform) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(backend + '/ChalanManagement/CreatePermitBill', { method: "POST", headers: ({ "CheckerKey": CheckerKey, "Auth": token }), body: uploadform })
    if (data.status > 300) {
      alert('Someerror')
    }
    else {
      alert('created permit Bill')
    }
  }

  async function GetPermit() {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/ChalanManagement/GetPermit`, {
      method: "GET",
      headers: { "CheckerKey": CheckerKey, Auth: token },
    });
    data = await data.json();
    return data;
  }

  async function getpermitbyid(id) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/ChalanManagement/getpermitbyid`, {
      method: "Post",
      headers: { "CheckerKey": CheckerKey, Auth: token, 'content-type': 'Application/json' },
      body: JSON.stringify({ id: id })
    });
    data = await data.json();
    return data;
  }

  async function CreateAgent(agentdata) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Agent/CreateAgent`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, Auth: token, 'content-type': 'Application/json' },
      body: JSON.stringify({ ...agentdata })
    })
    data = await data.json()
    return data;
  }

  async function GetAgent() {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Agent/GetAgent`, {
      method: "GET",
      headers: { "CheckerKey": CheckerKey, Auth: token }
    });
    data = await data.json()
    return data;
  }

  async function UpdateAgent(formdata) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Agent/UpdateAgent`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({ ...formdata })
    });
    data = await data.json()
    return data;
  }

  async function validatecaptcha(uniqid, text) {
    let CheckerKey = EncryptionKey()
    let encryptedUniqid = encryptData(uniqid, CheckerKey);
    let encryptedText = encryptData(text, CheckerKey);
    let headersList = ({
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
      "CheckerKey": CheckerKey
    })

    let bodyContent = JSON.stringify({
      "uniqid": encryptedUniqid,
      "text": encryptedText

    });

    let response = await fetch(`${backend}/Captcha/ValidateCaptcha`, {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });
    if (!response.ok) {
      throw new Error('Captcha validation failed');
    }
    let data = await response.text();
    return data

  }
  async function getcaptcha() {
    let CheckerKey = EncryptionKey()
    let headersList = {
      "CheckerKey": CheckerKey,
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",

    }

    let response = await fetch(`${backend}/Captcha/captcha`, {
      method: "GET",
      headers: headersList
    });

    let data = await response.json();
    return data

  }

  async function AdminLogin(loginform) {
    let CheckerKey = EncryptionKey()
    let encryptedPara = encryptData1(loginform, CheckerKey);
    let data = await fetch(backend + "/Admin/Login", { method: "POST", headers: ({ "CheckerKey": CheckerKey, "Content-Type": "application/json" }), body: JSON.stringify({ loginform: encryptedPara }) })
    data = await data.json()
    if (data.error) {
      if (data.attempts === 0) {
        throw new Error(`Login failed: Account locked for 5 minutes. Lock until: ${data.lockedUntil}`);
      } else {
        throw new Error(`Login failed: Invalid credentials. Attempts remaining: ${data.attempts}. Lock until: ${data.lockedUntil}`);
      }
    }
    // If no error, return the successful login data
    return data.token;
  }

  async function GetBills(PropertyID) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/CustomerBill/GetBill`, {
      method: "POST",
      headers: ({ "CheckerKey": CheckerKey, "Content-Type": "application/json" }),
      body: JSON.stringify({ BillNumber: PropertyID }),
    });
    data = await data.json();
    return data;
  }

  async function CashPayBill(form) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/CustomerPayment/CashPayBill`, {
      method: "Post",
      headers: { "CheckerKey": CheckerKey, Auth: token, 'content-type': 'Application/json' },
      body: JSON.stringify(form)
    });
    data = await data.json();
    return data;
  }

  async function GZIP(form) {
    console.log(form);
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Customer/getzip`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({ ...form })
    });
    data = await data.json();
    return data;
  }

  async function FetchFolderName() {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/HelperApi/FetchFolderName`, {
      method: "GET",
      headers: { "CheckerKey": CheckerKey, Auth: token },
    });
    data = await data.json();
    return data;
  }
  async function CheckGenerationProcess() {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Customer/CheckGenerationProcess`, {
      method: "GET",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
    })
    data = await data.json();
    return data;
  }
  async function ApplyDiscount(HashkeyGen) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/CustomerPayment/ApplyDiscount`, {
      method: "POST",
      headers: ({ "CheckerKey": CheckerKey, "Content-Type": "application/json" }),
      body: JSON.stringify({ ...HashkeyGen }),
    });
    data = await data.json();
    return data;
  }

  async function CreateLicense(uploadform) {
    console.log("uploadform", uploadform)
    let CheckerKey = EncryptionKey()
    let data = await fetch(backend + '/LicenseManagements/CreateLicense',
      { method: "POST", headers: ({ "Auth": token, "CheckerKey": CheckerKey }), body: uploadform })
    console.log("context", data);
    return data
    // if (data.status > 300) {
    //   alert('Someerror')
    // }
    // else {
    //   alert('created License')
    // }
  }

  async function DiscountType() {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Master/DiscountType`, {
      method: "GET",
      headers: { "CheckerKey": CheckerKey, Auth: token },
    });
    data = await data.json();
    return data;
  }


  async function AddDiscountType(discounts) {
    let CheckerKey = EncryptionKey()
    if (discounts.type == "insert") {
      let data = await fetch(`${backend}/Master/SetDiscountType`, {
        method: "POST",
        headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
        body: JSON.stringify({ ...discounts }),
      })
      data = await data.json();
      return data;
    } else {
      let data = await fetch(`${backend}/Master/SetDiscountType`, {
        method: "POST",
        headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
        body: JSON.stringify({ ...discounts }),
      })
      data = await data.json();
      return data;
    }
  }

  async function DeleteDiscountType(id) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Master/DeleteDiscountType`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({ id }),
    });
    data = await data.json();
  }

  async function CustomerReport(formdata) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Reports/CustomerReport`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({
        ...formdata
      }),
    });
    data = await data.json();
    console.log(data);
    return data;
  }

  async function TransactionReport(formdata) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Reports/TransactionReports`, {
      method: "POST",
      headers: ({ "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token }),
      body: JSON.stringify({ ...formdata }),
    });
    data = await data.json();
    return data;
  }

  async function GetHashCashKey(HashkeyGen) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/CustomerPayment/CashHash`, {
      method: "POST",
      headers: ({ "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token }),
      body: JSON.stringify({ ...HashkeyGen }),
    });
    data = await data.json();
    return data;
  }

  async function DeleteRateTypes(id) {
    console.log("context id", id);
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Master/deleteRatetype`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({ id }),
    });
    data = await data.json();
    return data;
  }

  async function LocalityRate(locality, Meter, ConstructionRate) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/HelperApi/LocalityRate`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json" },
      body: JSON.stringify({ locality: locality, Meter: Meter, Constructionrate: ConstructionRate }),
    });
    data = await data.json();
    return data;
  }

  async function PropertyRate(id) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/HelperApi/PropertyRate`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json" },
      body: JSON.stringify({ PropertyType: id }),
    });
    data = await data.json();
    return data;
  }
  async function ApproveBulkApplication(customerid, status) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Customer/BulkApprovals`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({ condition: status, customerid: customerid })
    });
    data = await data.json();
    return data;
  }

  async function NoticeofdemandReports(formdata) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Reports/NoticeofdemandReports`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify(formdata),
    });
    data = await data.json();
    return data;
  }
  async function GetLicenseBill() {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/LicenseManagements/GetLicenseBill`, {
      method: "Post",
      headers: { "CheckerKey": CheckerKey, Auth: token, 'content-type': 'Application/json' },
    });
    data = await data.json();
    return data;
  }

  async function FindLicence(billdata) {

    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Customer/GetLicenseDetails`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({
        billdata: billdata,
      }),
    });
    data = await data.json();
    return data;
  }

  async function ApproveLicenceApplication(customerid) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/LicenseManagements/LicenceApprovals`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({ condition: "Approved", Gala: customerid })
    });
    data = await data.json();
    return data;
  }

  return (
    <Admin.Provider
      value={{
        ApplyDiscount,
        CheckGenerationProcess,
        GZIP,
        AdminLogin,
        getcaptcha,
        validatecaptcha,
        getpermitbyid,
        GetCustomerList,
        DashboardReports,
        DashboardChartZone,
        DashboardChartWard,
        DashboardReportsForTotal,
        DashboardReportsForToday,
        CreateCustomer,
        EmployeeManagement,
        Roles,
        EditRoleActions,
        hey,
        confirmpayment,
        BillWhatsappPayment,
        GetDocumentForm,
        FindCustomer,
        sethey,
        GenerateBill,
        GetMenus,
        CreateBill,
        UpdateBill,
        CustomerUpdateBill,
        GetCustomerData,
        GetCustomerBillData,
        LocalityRates,
        AddLocalityRates,
        DocumentsType,
        AddDocumentsType,
        DeleteDocumentTypes,
        LocalityTypes,
        AddLocalityTypes,
        TaxType,
        AddTaxTypes,
        DeleteTaxType,
        PropertyTypes,
        AddPropertyTypes,
        DeletePropertyType,
        GetCordinates,
        GetCordinatesOnStartup,
        ApproveApplication,
        BulkBillGeneration,
        BulkBillDownload,
        UpdateCustomer,
        GettoPermit,
        CreatePermitBill,
        GetPermit,
        GetPermitTypes,
        AddPermitTypes, DisablePermitType,
        CreateAgent,
        GetAgent,
        UpdateAgent,
        GetBills,
        CashPayBill,
        FetchFolderName,
        CreateLicense, DiscountType, AddDiscountType,
        CustomerReport, TransactionReport,
        GetHashCashKey, DeleteRateTypes, LocalityRate, PropertyRate, ApproveBulkApplication, NoticeofdemandReports, GetLicenseBill, DeleteDiscountType, FindLicence, ApproveLicenceApplication, DashboardChart
      }}
    >
      {props.children}
    </Admin.Provider>
  );
};
