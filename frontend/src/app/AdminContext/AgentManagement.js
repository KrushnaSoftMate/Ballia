'use client'
import React, { createContext, useState, useEffect } from 'react'
import { backend } from "../paths"
export const Agent = createContext()
import aes256 from "aes256";

const AgentManagement = (props) => {
    function EncryptionKey() {
        let keyaccess = aes256.encrypt('#$@!#$%Vinay%$#@Tandale)(*#$(', 'SystemAppliactionOKay')
        const obj = {
            keyaccess: keyaccess
        }
        return JSON.stringify(obj)
    }
    const [data, setData] = useState('data')

    let token;
    if (typeof window !== "undefined") {
        token = window.localStorage.getItem("AgentToken");
    }

    async function GetMenus() {
        let CheckerKey = EncryptionKey()
        console.log("CheckerKey",CheckerKey);
        let data = await fetch(`${backend}/AgentLogin/GetMenus`, {
            method: "GET",
            headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token }
        })
        data = await data.json()
        return data
    }

    async function AgentLogin(loginform) {
        let CheckerKey = EncryptionKey()
        let data = await fetch(backend + "/AgentLogin/Login", { method: "POST", headers: ({ "CheckerKey": CheckerKey, "Content-Type": "application/json" }), body: JSON.stringify({ ...loginform }) })
        data = await data.json()
        console.log(data);
        return data
    }

    async function CreatePermitBill(uploadform) {
        let CheckerKey = EncryptionKey()
        let data = await fetch(backend + '/ChalanManage/CreatePermitBill', { method: "POST", headers: ({ "Auth": token, "CheckerKey": CheckerKey }), body: uploadform })
        if (data.status > 300) {
            alert('Someerror')
        }
        else {
            alert('created permit Bill')
        }
    }

    async function GetPermit() {
        let CheckerKey = EncryptionKey()
        let data = await fetch(`${backend}/ChalanManage/GetPermit`, {
            method: "GET",
            headers: { "CheckerKey": CheckerKey, Auth: token },
        });
        data = await data.json();
        return data;
    }

    async function getpermitbyid(id) {
        let CheckerKey = EncryptionKey()
        let data = await fetch(`${backend}/ChalanManage/getpermitbyid`, {
            method: "Post",
            headers: { "CheckerKey": CheckerKey, Auth: token, 'content-type': 'Application/json' },
            body: JSON.stringify({ id: id })
        });
        data = await data.json();
        return data;
    }

    async function AgentProfile() {
        let CheckerKey = EncryptionKey()
        let data = await fetch(`${backend}/ChalanManage/AgentProfile`, {
            method: "GET",
            headers: { "CheckerKey": CheckerKey, Auth: token, 'content-type': 'Application/json' },
        });
        data = await data.json();
        return data;
    }

    async function GetPermitBill(BillNumber) {
        let CheckerKey = EncryptionKey()
        let data = await fetch(`${backend}/ChalanManage/GetPermitBill`, {
            method: "Post",
            headers: { "CheckerKey": CheckerKey, Auth: token, 'content-type': 'Application/json' },
            body: JSON.stringify({ BillNumber: BillNumber })
        });
        data = await data.json();
        return data;
    }

    async function TokenPayment(form) {
        let CheckerKey = EncryptionKey()
        let data = await fetch(`${backend}/Payment/GetPaymentToken`, {
            method: "Post",
            headers: { "CheckerKey": CheckerKey, Auth: token, 'content-type': 'Application/json' },
            body: JSON.stringify(form)
        });
        data = await data.json();
        return data;
    }

    async function TokenPaymentSuccess(form) {
        let CheckerKey = EncryptionKey()
        let data = await fetch(`${backend}/Payment/PayBill`, {
            method: "Post",
            headers: { "CheckerKey": CheckerKey, Auth: token, 'content-type': 'Application/json' },
            body: JSON.stringify(form)
        });
        data = await data.json();
        return data;
    }
    async function CashPayBill(form) {
        let CheckerKey = EncryptionKey()
        let data = await fetch(`${backend}/Payment/CashPayBill`, {
            method: "Post",
            headers: { "CheckerKey": CheckerKey, Auth: token, 'content-type': 'Application/json' },
            body: JSON.stringify(form)
        });
        data = await data.json();
        return data;
    }

    async function UpdatePermitBill(uploadform) {
        let CheckerKey = EncryptionKey()
        let data = await fetch(`${backend}/ChalanManage/UpdatePermitBill`, {
            method: "Post",
            headers: { "CheckerKey": CheckerKey, "Auth": token },
            body: uploadform,
        });
        data = await data.json();
        return data;
    }

    async function GetDocumentForm() {
        let CheckerKey = EncryptionKey()
        let data = await fetch(`${backend}/AgentHelper/CustomerForm`, {
            method: "GET",
            headers: { "CheckerKey": CheckerKey, Auth: token },
        });
        data = await data.json();
        return data;
    }

    async function CreateCustomer(uploadform) {
        console.log(uploadform);
        let CheckerKey = EncryptionKey()
        let data = await fetch(backend + '/AgentCustomerManagement/CustomerManagement', {  method: "POST", headers: ({ "Auth": token,"CheckerKey": CheckerKey }), body: uploadform })
        console.log("data");
        console.log(data);
        if (data.status > 300) {
            alert('customer not created')
        }
        else {
            alert('created customer')
        }
    }

    async function FindCustomer(ConsumerNumber) {
        let CheckerKey = EncryptionKey()
        let data = await fetch(`${backend}/AgentCustomerManagement/getCustomer`, {
            method: "POST",
            headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
            body: JSON.stringify({
                ConsumerNo: ConsumerNumber,
            }),
        });
        data = await data.json();
        return data;
    }
    async function GetCustomerList(ConsumerNumber) {
        let CheckerKey = EncryptionKey()
        let data = await fetch(`${backend}/AgentCustomerManagement/GetCustomerList`, {
          method: "POST",
          headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
          body: JSON.stringify({
            locality: ConsumerNumber,
          }),
        });
        data = await data.json();
        return data;
      }
     

    async function AgentTranscationHistory(FromDate, ToDate, Limit) {
        let CheckerKey = EncryptionKey()
        let data = await fetch(`${backend}/ChalanManage/GetTransactionHistory`, {
            method: "POST",
            headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
            body: JSON.stringify({ FromDate: FromDate, ToDate: ToDate, Limit: Limit })
        });
        data = await data.json()
        // console.log(data);
        return data

    }

    async function CreateLicense(uploadform) {
        let CheckerKey = EncryptionKey()
        let data = await fetch(backend + '/LicenseManagement/CreateLicense',
             { method: "POST", headers: ({ "Auth": token, "CheckerKey": CheckerKey }), body: uploadform })
        console.log(data);
        data = await data.json();
        return data;
    }

    async function GetCustomerLicense(Gala) {
        let CheckerKey = EncryptionKey()
        let data = await fetch(`${backend}/LicenseManagement/GetCustomerLicense`, {
            method: "POST",
            headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
            body: JSON.stringify({
                Gala: Gala,
            }),
        });
        data = await data.json();
        return data;
    }
    async function Getgala(parameter) {
        let CheckerKey = EncryptionKey()
        let data = await fetch(`${backend}/LicenseManagement/GetGalaDetails`, {
            method: "POST",
            headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
            body: JSON.stringify({
                parameter: parameter,
            }),
        });
        data = await data.json();
        return data;
    }
    
    async function CreateLicenseBill(formdata) {
        let CheckerKey = EncryptionKey()
        let data = await fetch(`${backend}/LicenseManagement/CreateLicenseBill`, {
            method: "POST",
            headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
            body: JSON.stringify({
                ...formdata
            }),
        });
        data = await data.json();
        return data;
    }    
    async function GetLicenseDetails() {
        let CheckerKey = EncryptionKey()
        let data = await fetch(`${backend}/LicenseManagement/GetLicenseDetails`, {
            method: "GET",
            headers: ({ "CheckerKey": CheckerKey, Auth: token }),
        });
        data = await data.json();
        console.log(data);
        return data;
    }
    async function GetLicenseBill(Gala) {
        console.log(Gala);
        let CheckerKey = EncryptionKey()
        let data = await fetch(`${backend}/LicenseManagement/GetLicenseBill`, {
            method: "Post",
            headers: { "CheckerKey": CheckerKey, Auth: token, 'content-type': 'Application/json' },
            body: JSON.stringify({ Gala: Gala })
        });
        data = await data.json();
        return data;
    }

    async function LicenseTokenPayment(form) {
        let CheckerKey = EncryptionKey()
        let data = await fetch(`${backend}/Payment/GetPaymentTokenForLicense`, {
            method: "Post",
            headers: { "CheckerKey": CheckerKey, Auth: token, 'content-type': 'Application/json' },
            body: JSON.stringify(form)
        });
        data = await data.json();
        console.log(data);
        return data;
    }

    async function LicenseTokenPaymentSuccess(form) {
        let CheckerKey = EncryptionKey()
        let data = await fetch(`${backend}/Payment/PayLicenseBill`, {
            method: "Post",
            headers: { "CheckerKey": CheckerKey, Auth: token, 'content-type': 'Application/json' },
            body: JSON.stringify(form)
        });
        data = await data.json();
        return data;
    }


    async function LicenseCashPayBill(form) {
        let CheckerKey = EncryptionKey()
        let data = await fetch(`${backend}/Payment/LicenseCashPayBill`, {
            method: "Post",
            headers: { "CheckerKey": CheckerKey, Auth: token, 'content-type': 'Application/json' },
            body: JSON.stringify(form)
        });
        data = await data.json();
        return data;
    }

    async function LicenseTranscationHistory(FromDate, ToDate, Limit) {
        let CheckerKey = EncryptionKey()
        let data = await fetch(`${backend}/LicenseManagement/GetLicenseTransactionHistory`, {
            method: "POST",
            headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
            body: JSON.stringify({ FromDate: FromDate, ToDate: ToDate, Limit: Limit })
        });
        data = await data.json()
        // console.log(data);
        return data

    }

    async function LocalityRate(locality,ConstructionRate) {
        let CheckerKey = EncryptionKey()
        let data = await fetch(`${backend}/AgentHelper/LocalityRate`, {
          method: "POST",
          headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
          body: JSON.stringify({ uniqueness:locality,rate:ConstructionRate }),
        });
        data = await data.json();
        return data;
      }
    
      async function PropertyRate(id) {
        let CheckerKey = EncryptionKey()
        let data = await fetch(`${backend}/AgentHelper/PropertyRate`, {
          method: "POST",
          headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
          body: JSON.stringify({ PropertyType:id }),
        });
        data = await data.json();
        return data;
      }


    return (
        <Agent.Provider value={{ Getgala,CashPayBill, TokenPaymentSuccess, TokenPayment, GetMenus, CreatePermitBill, GetPermit, getpermitbyid, AgentProfile, GetPermitBill, UpdatePermitBill, GetDocumentForm, CreateCustomer, FindCustomer,GetCustomerList, AgentTranscationHistory, AgentLogin, CreateLicense, GetCustomerLicense,CreateLicenseBill,GetLicenseDetails,GetLicenseBill,LicenseTokenPayment,LicenseTokenPaymentSuccess,LicenseCashPayBill,LicenseTranscationHistory,LocalityRate,PropertyRate }}>
            {props.children}
        </Agent.Provider>
    )

}



export default AgentManagement
