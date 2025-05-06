"use client";
import React, { useState, useContext, useEffect, useRef } from "react";
import { Customer } from "@/app/AdminContext/CustomerManagement";
import Link from "next/link";
import { Router } from "next/router";
import { HASHKEY, ENV } from "@/app/paths";
const page = ({ params }) => {
  const statecalls = useContext(Customer);
  const { GetBills, GetHashKey, CustomerPayment, ApplyDiscount } = statecalls;
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
    let d = await ApplyDiscount({ id: params.id })
    if (d) {
      const data = await GetBills(params.id);
      setRenderData(data.customer[0]);
    }
  };
  async function GetHashKeyData(x) {
    x.preventDefault();
    let obj = {
      ...renderdata,
      ...billdata,
    };
    let haskey = await GetHashKey(obj);
    SetHaskey(haskey?.data);
    if (typeof window !== "undefined") {


      var easebuzz = new window.EasebuzzCheckout(HASHKEY, ENV);
      let response1 = null;
      var options = {
        access_key: haskey?.data,

        onResponse: async (response1) => {
          let obj1 = {
            ...renderdata,
            ...billdata,

            ...response1
          };
          await CustomerPayment(obj1);
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



  const handleReset = () => {
    formref.current.reset()
    setBillData({})
  };

  return (
    <div style={{ width: "100vw", display: "flex", justifyContent: "center", }}>
      <form ref={formref} onSubmit={GetHashKeyData}>
        <div className="card my-5" style={{ backgroundColor: "#f2fcf7" }}>
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
                required
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
                required
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
                required
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
                required
                ref={customernum}
              ></input>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: '15px' }}>
              <button style={{ background: 'linear-gradient(180deg, rgba(247,168,7,1) 63%, rgba(225 31 31) 79%)', color: "white", fontWeight: "bold" }} type="submit" className="btn my-2">Pay now</button>
              <button type="button" onClick={() => handleReset()} style={{ backgroundColor: 'tranparent', color: "white", fontWeight: "bold" }} className="my-2 mx-2 btn  btn-primary">Clear</button>
            </div>
            <div style={{ padding: "1rem" }}>
              <div>
                <h6>Note :- </h6>
              </div>
              <div>
                <ol>
                  <li>1% discount will be available on online payment, <br/>applicable only for full payment.</li>
                  <li>If bill pay with in the 3 months then 10% discount <br/>will be applied, applicable only for full payment. </li>
                  <li>If payment is not paid with in the bill duration then 10% <br/>interest will be charged on due amount of that bill.</li>
                </ol>
              </div>
              <div>
              <div>
                <h6>Note :- </h6>
              </div>
              <div>
                <ol>
                  <li>ऑनलाइन पेमेंट पर मिलेगी 1% छूट
                  केवल पूर्ण भुगतान के लिए लागू।</li>
                  <li>3 महीने में बिल भुगतान करने पर 10% की छूट
                  लागू किया जाएगा,<br/> केवल पूर्ण भुगतान के लिए लागू होगा।</li>
                  <li>यदि बिल अवधि में भुगतान नहीं किया गया तो 10%
                  उस बिल की देय <br/> राशि पर ब्याज लगाया जाएगा।</li>
                </ol>
              </div>
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};

export default page;
