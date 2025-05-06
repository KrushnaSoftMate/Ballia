"use client";
import React, { useState, useContext, useEffect, useRef } from "react";
import { Customer } from "@/app/AdminContext/CustomerManagement";
import Link from "next/link";
import { Router } from "next/router";
import { HASHKEY,ENV } from "@/app/paths";

const page = ({ params }) => {
  const statecalls = useContext(Customer);
  const { GetPermitBills, GetPermitHashKey, CustomerPermitPayment } = statecalls;
  const [renderdata, setRenderData] = useState({});
  const [billdata, setBillData] = useState({
    Amount: "",
    UserName: "",
    Email: "",
    Mobile_No: "",
  });
  const customernum = useRef()
  const formref = useRef(null)
  const [Haskey, SetHaskey] = useState();
  useEffect(() => {
    getBill();
    return () => { };
  }, []);


  const getBill = async () => {
    const data = await GetPermitBills(params.id);
    setRenderData(data[0]);
  };
  async function GetHashKeyData(x) {
    x.preventDefault();
    let obj = {
      ...renderdata,
      ...billdata,
    };
    let haskey = await GetPermitHashKey(obj);
    SetHaskey(haskey?.data);
    if (typeof window !== undefined) {
      if (billdata.Amount <= 0 || billdata.Amount <= renderdata?.Remaining) {
        alert("Please enter valid amount")
        handleReset()
      } else {
        var easebuzz = new window.EasebuzzCheckout( HASHKEY,ENV);
        let response1 = null;
        var options = {
          access_key: haskey?.data,
          onResponse: async (response1) => {
            let obj1 = {
              ...renderdata,
              ...billdata,
              ...response1
            };
            await CustomerPermitPayment(obj1);
            if (response1.status === "success") {
              alert('Payment Success full')
              window.location.href = `/Reciept/${params.id}`
            }
          },
          theme: "#123456",
        };
        easebuzz.initiatePayment(options);

      }
    }
  }

  const handleReset = () => {
    formref.current.reset()
    setBillData({})
  };

  return (
    <div style={{ width: "98vw", display: "flex", justifyContent: "center", }}>
      <form ref={formref} onSubmit={GetHashKeyData}>
        <div className="card my-5" style={{ backgroundColor: "#f2fcf7", textAlign: 'center' }}>
          <h4 style={{ background: 'linear-gradient(185deg, rgba(133,27,43,1) 36%, rgba(133,27,130,1) 68%)', color: 'white', textAlign: 'center' }}>Pay Bill Form</h4>
          <div className="card-body">
            <div style={{ display: "flex", justifyContent: 'space-between', marginTop: '1rem' }}>
              <label style={{ fontWeight: 'bold' }}>Amount</label>

              <input
                id="Amount"
                onChange={(e) => {
                  setBillData({
                    ...billdata,
                    [e.currentTarget.id]: e.currentTarget.value,
                  });
                }}
                style={{ width: '20rem' }}
                placeholder={renderdata?.Remaining}
                className="form-control"
                type="number"
                ref={customernum}
              ></input>
            </div>
            <div style={{ display: "flex", justifyContent: 'space-between', marginTop: '1rem' }}>
              <label style={{ fontWeight: 'bold' }}>UserName</label>

              <input
                id="UserName"
                onChange={(e) => {
                  setBillData({
                    ...billdata,
                    [e.currentTarget.id]: e.currentTarget.value,
                  });
                }}
                style={{ width: '20rem' }}
                placeholder={renderdata?.FullName}
                className="form-control"
                type="text"
                ref={customernum}
              ></input>
            </div>
            <div style={{ display: "flex", justifyContent: 'space-between', marginTop: '1rem' }}>
              <label style={{ fontWeight: 'bold' }}>Email</label>

              <input
                id="Email"
                onChange={(e) => {
                  setBillData({
                    ...billdata,
                    [e.currentTarget.id]: e.currentTarget.value,
                  });
                }}
                style={{ width: '20rem' }}
                placeholder="Enter Email"
                className="form-control"
                type="email"
                ref={customernum}
              ></input>
            </div>
            <div style={{ display: "flex", justifyContent: 'space-between', marginTop: '1rem' }}>
              <label style={{ fontWeight: 'bold' }}>Mobile_No</label>
              <input
                id="Mobile_No"
                onChange={(e) => {
                  setBillData({
                    ...billdata,
                    [e.currentTarget.id]: e.currentTarget.value,
                  });
                }}
                style={{ width: '20rem' }}
                placeholder="Enter Mobile No."
                className="form-control"
                type="number"
                ref={customernum}
              ></input>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: '15px' }}>
              <button style={{ background: 'linear-gradient(180deg, rgba(247,168,7,1) 63%, rgba(225 31 31) 79%)', color: "white", fontWeight: "bold" }} type="submit" className="btn my-2">Pay now</button>
              <button type="button" onClick={() => handleReset()} style={{ backgroundColor: 'tranparent', color: "white", fontWeight: "bold" }} className="my-2 mx-2 btn  btn-primary">Clear</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default page;
