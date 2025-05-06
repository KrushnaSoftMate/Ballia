"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { apiurl, backend } from "../paths";
import aes256 from "aes256";
export const Customer = createContext();

export const CustomerManagement = (props) => {


  function EncryptionKey() {
    let keyaccess = aes256.encrypt('#$@!#$%Vinay%$#@Tandale)(*#$(', 'SystemAppliactionOKay')
    const obj = {
      keyaccess: keyaccess
    }
    return JSON.stringify(obj)
  }
  async function GetBills(BillNumber) {
    let CheckerKey = EncryptionKey();
    const token = localStorage.getItem("Citizen");

    if (!token) {
      alert("You are not logged in!");
      window.location.href = "/"; // Redirect to login page
      return;
    }

    let data = await fetch(`${backend}/CustomerBill/GetBill`, {
      method: "POST",
      headers: ({
        "CheckerKey": CheckerKey,
        "Content-Type": "application/json",
        Auth: token
      }),
      body: JSON.stringify({ BillNumber: BillNumber }),
    });
    data = await data.json();
    return data;
  }

  async function ViewBills(BillNumber) {
    let CheckerKey = EncryptionKey();

    const token = localStorage.getItem("Citizen");
    console.log("Token i get ::=============", token)

    if (!token) {
      alert("You are not logged in!");
      window.location.href = "/"; // Redirect to login page
      return;
    };

    let data = await fetch(`${backend}/Customer/ViewBill`, {
      method: "POST",
      headers: { "CheckerKey": CheckerKey, "Content-Type": "application/json", Auth: token },
      body: JSON.stringify({ BillNumber: BillNumber }),
    });
    data = await data.json();
    return data;
  }

  async function GetHashKey(HashkeyGen) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/CustomerPayment/GenerateHash`, {
      method: "POST",
      headers: ({ "CheckerKey": CheckerKey, "Content-Type": "application/json" }),
      body: JSON.stringify({ ...HashkeyGen }),
    });
    data = await data.json();
    return data;
  }

  async function CustomerPayment(HashkeyGen) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/CustomerPayment/BillPayment`, {
      method: "POST",
      headers: ({ "CheckerKey": CheckerKey, "Content-Type": "application/json" }),
      body: JSON.stringify({ ...HashkeyGen }),
    });
    data = await data.json();
    return data;
  }

  async function GetCustomerDetails(Para) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/CustomerBill/CustomerDetails`, {
      method: "POST",
      headers: ({ "CheckerKey": CheckerKey, "Content-Type": "application/json" }),
      body: JSON.stringify({ Para: Para }),
    });
    data = await data.json();
    return data;
  }

  async function GetBillHistory(Para) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Customer/BillHistory`, {
      method: "POST",
      headers: ({ "CheckerKey": CheckerKey, "Content-Type": "application/json" }),
      body: JSON.stringify({ Para: Para }),
    })
    data = await data.json();
    return data;
  }

  async function GetPermitBills(Para) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/CustomerBill/GetPermitBill`, {
      method: "POST",
      headers: ({ "CheckerKey": CheckerKey, "Content-Type": "application/json" }),
      body: JSON.stringify({ Para: Para }),
    });
    data = await data.json();
    return data;
  }

  async function GetPermitHashKey(HashkeyGen) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/CustomerPayment/PermitGenerateHash`, {
      method: "POST",
      headers: ({ "CheckerKey": CheckerKey, "Content-Type": "application/json" }),
      body: JSON.stringify({ ...HashkeyGen }),
    });
    data = await data.json();
    return data;
  }

  async function CustomerPermitPayment(HashkeyGen) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/CustomerPayment/PermitBillPayment`, {
      method: "POST",
      headers: ({ "CheckerKey": CheckerKey, "Content-Type": "application/json" }),
      body: JSON.stringify({ ...HashkeyGen }),
    });
    data = await data.json();
    return data;
  }

  async function GetPermitBills(Para) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/CustomerBill/GetPermitBill`, {
      method: "POST",
      headers: ({ "CheckerKey": CheckerKey, "Content-Type": "application/json" }),
      body: JSON.stringify({ Para: Para }),
    });
    data = await data.json();
    return data;
  }

  async function GetReciept(BillNumber) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/CustomerBill/GetReciept`, {
      method: "POST",
      headers: ({ "CheckerKey": CheckerKey, "Content-Type": "application/json" }),
      body: JSON.stringify({ BillNumber: BillNumber }),
    });
    data = await data.json();
    return data;
  }

  async function GetPermitReciept(BillNumber) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/CustomerBill/GetPermitReciept`, {
      method: "POST",
      headers: ({ "CheckerKey": CheckerKey, "Content-Type": "application/json" }),
      body: JSON.stringify({ BillNumber: BillNumber }),
    });
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

  async function GetLicenseBills(Gala) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/CustomerBill/GetLicenseBill`, {
      method: "POST",
      headers: ({ "CheckerKey": CheckerKey, "Content-Type": "application/json" }),
      body: JSON.stringify({ Gala: Gala }),
    });
    data = await data.json();
    return data;
  }

  async function GetLicenseHashKey(HashkeyGen) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/CustomerPayment/GenerateLicenseHash`, {
      method: "POST",
      headers: ({ "CheckerKey": CheckerKey, "Content-Type": "application/json" }),
      body: JSON.stringify({ ...HashkeyGen }),
    });
    data = await data.json();
    return data;
  }

  async function CustomerLicensePayment(HashkeyGen) {
    console.log(HashkeyGen);
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/CustomerPayment/LicenseBillPayment`, {
      method: "POST",
      headers: ({ "CheckerKey": CheckerKey, "Content-Type": "application/json" }),
      body: JSON.stringify({ ...HashkeyGen }),
    });
    data = await data.json();
    console.log(data);
    return data;
  }

  async function CitizenSignup(formdata) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Customer/Signup`, { method: "POST", headers: ({ "CheckerKey": CheckerKey, "Content-Type": "application/json" }), body: JSON.stringify({ ...formdata }) })
    data = await data.json()
    console.log(data);
    return data
  }
  async function CitizenLogin(loginform) {
    try {
      let CheckerKey = EncryptionKey()
      // let encryptedPara = encryptData1(loginform, CheckerKey);
      let data = await fetch(backend + "/Customer/Login",
        {
          method: "POST",
          headers: ({ "CheckerKey": CheckerKey, "Content-Type": "application/json" }), body: JSON.stringify({ ...loginform })
        })
      data = await data.json();

      //   if (data.error) {
      //     if (data.attempts === 0) {
      //         throw new Error(`Login failed: Account locked for 5 minutes. Lock until: ${data.lockedUntil}`);
      //     } else {
      //         throw new Error(`Login failed: Invalid credentials. Attempts remaining: ${data.attempts}. Lock until: ${data.lockedUntil}`);
      //     }
      // }
      if (data.error) {
        return alert(data.message);
      };


      console.log("Login data I get from Backend :: ", data);
      window.localStorage.setItem("Citizen", data.token);
      return data.token;
    }
    catch (err) {
      console.log(err);
    }
  }



  async function sendSms(phone1, otp1) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Customer/sendotp`, {
      method: "POST",
      headers: ({ "CheckerKey": CheckerKey, "Content-Type": "application/json" }),
      body: JSON.stringify({ phone: phone1, otp: otp1 }),
    });
    data = await data.json();
    return data;
  }


  async function verifyOtp(phone1, otp1) {
    let CheckerKey = EncryptionKey();
    let response = await fetch(`${backend}/Customer/verifyOtp`, {
      method: "POST",
      headers: {
        "CheckerKey": CheckerKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ phone: phone1, otp: otp1 }),
    });
    let data = await response.json();
    console.log("context", data);
    return data;
  };

  async function ViewLicenceBills(BillNumber) {
    let CheckerKey = EncryptionKey()
    let data = await fetch(`${backend}/Customer/GetLicenseBill`, {
      method: "POST",
      headers: ({ "CheckerKey": CheckerKey, "Content-Type": "application/json" }),
      body: JSON.stringify({ Gala: BillNumber }),
    });
    data = await data.json();
    return data;
  }


  async function CCreateCustomer(uploadform) {
    let CheckerKey = EncryptionKey()

    const token = localStorage.getItem("Citizen");

    if (!token) {
      alert("You are not logged in!");
      window.location.href = "/"; // Redirect to login page
      return;
    }

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

  return (
    <Customer.Provider value={{ ApplyDiscount, ViewBills, GetBills, GetHashKey, CustomerPayment, GetCustomerDetails, GetBillHistory, GetPermitBills, GetPermitHashKey, CustomerPermitPayment, GetPermitBills, GetReciept, GetPermitReciept, GetLicenseBills, GetLicenseHashKey, CustomerLicensePayment, CitizenSignup, CitizenLogin, sendSms, verifyOtp, ViewLicenceBills, CCreateCustomer }}>{props.children}</Customer.Provider>
  );
};
