"use client";
import { Admin } from "@/app/AdminContext/AdminManageMent";
import React, { useState, useContext, useEffect } from "react";
import { backend } from '../../../paths'
import { useRouter } from "next/navigation";

const page = () => {
  const statecalls = useContext(Admin);
  const { FindCustomer, ApproveApplication } = statecalls;
  const [renderdata, setRenderData] = useState([])
  const [docs, setDocs] = useState([])
  const [billdata, setBillData] = useState({})
  const navigate = useRouter()
  const getcustomer = async (e) => {
    e.preventDefault();
    const data = await FindCustomer(billdata.BillNumber);
    setRenderData(data.customer.PropertyID);
    setDocs(data.docs);
    if (data.customer.length != 0) {
      navigate.push('/Admin/Customer/CustomerUpdate/' + billdata.BillNumber)
    } else {
      alert('incorrect customer id')
    }
  }
  return (
    // <div style={{ padding: "20px" }}>
    //   <form onSubmit={getcustomer} style={{ width: "20vw", display: "grid" }}>
    //     <input className="form-control" type="text" id="BillNumber" placeholder="Enter PropertyID Here" onChange={(e) => setBillData({ ...billdata, [e.currentTarget.id]: e.target.value })} />
    //     <button className="my-2 btn btn-success">Get Customer</button>
    //   </form>
    // </div>
    <>
      <div style={{ backgroundColor: '#f2f4f7', padding: "20px", height: '110vh' }}>
        <div>
          <h5><b>Customer Management : Update Customer</b></h5>
        </div>
        <div
          style={{
            display: 'grid',
            border: '2px solid',
            borderRadius: '20px',
            border: 'none',
            padding: '30px',
            backgroundColor: 'white',
          }}
        >
          <form >
            <div
              className="col"
              style={{
                border: '1px solid #f1772e',
                backgroundColor: 'lightyellow',
                padding: '20px 0px',
                borderRadius: '10px'
              }}
            >
              <div className="col" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <h5 htmlFor="NI_Type" className="form-label col-sm-2" style={{ textAlign: 'center', padding: '8px 0px', fontSize: '15px' }}>
                  <b>Enter Customer ID</b>
                </h5>
                <input className="col-sm-4" type="text" id="BillNumber" placeholder="Enter Customer ID Here" onChange={(e) => setBillData({ ...billdata, [e.currentTarget.id]: e.target.value })} style={{
                  padding: '5px',
                  borderRadius: '10px',
                  borderColor: 'rgb(212, 212, 212)',
                }} />
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                  <div style={{ position: 'relative', display: 'flex', paddingRight: "8px" }}>
                    <img
                      src="/Search.png"
                      alt="Search"
                      style={{
                        width: '15px',
                        position: 'absolute',
                        top: '35%',
                        left: "4%",
                        cursor: 'pointer',
                      }}
                    />
                    <button onClick={getcustomer}
                      style={{
                        backgroundImage: '/loginimage.png',
                        height: "2.5rem",
                        width: '12rem',
                        color: 'white',
                        backgroundColor: '#f1772e',
                        border: 'none',
                        borderRadius: '10px',
                      }}
                    >
                      Update Customer
                    </button>

                    <button
                      style={{
                        height: "2.5rem",
                        width: '06rem',
                        border: 'none',
                        borderRadius: '10px',
                      }}
                      className="bg-danger mx-3"
                      onClick={(e) => window.location.reload()}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default page