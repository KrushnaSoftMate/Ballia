"use client";
import { Agent } from "@/app/AdminContext/AgentManagement";
import React, { useState, useContext, useEffect } from "react";
import { backend } from '../../../paths'
const GetCustomer = (props) => {

  const statecalls = useContext(Agent);
  const { Getgala} = statecalls;
  const [renderdata, setRenderData] = useState([])
  const [docs, setDocs] = useState([])
  const [billdata, setBillData] = useState({})
  const [isLoading, setIsLoading] = useState(false);


  const getcustomer = async (e) => {
    e.preventDefault();
    const data = await Getgala(billdata.BillNumber);
    setRenderData(data.customer);
    setDocs(data.docs);
  }

  async function Submit(condition) {
    let approvance = await ApproveApplication(condition, billdata.BillNumber)
    if (approvance) {
      alert("Approvance " + condition)
    } else {

    }
  }

  return (
    <>
      <div style={{ backgroundColor: '#f2f4f7', padding: "20px", height: '110vh' }}>
        {/* <form onSubmit={getcustomer} style={{ width: "20vw", display: "grid" }}>
          <input className="form-control" type="text" id="BillNumber" placeholder="Enter PropertyID Here" onChange={(e) => setBillData({ ...billdata, [e.currentTarget.id]: e.target.value })} />
          <button className="my-2 btn btn-success">Get Customer</button>
        </form> */}

        <div>
          <h5><b>Customer Management : Get Customer</b></h5>
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
          <form onSubmit={getcustomer}>
            <div
              className="col"
              style={{
                border: '1px solid #f1772e',
                backgroundColor: 'lightyellow',
                padding: '20px 0px',
                borderRadius: '10px'
              }}
            >
              <div
                className="col"
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  flexWrap: 'wrap',
                }}
              >
                <h5 htmlFor="NI_Type" className="form-label col-sm-2" style={{ textAlign: 'center', padding: '8px 0px', fontSize: '15px' }}>
                  <b>Enter Property ID</b>
                </h5>
                <input className="col-sm-6" type="text" id="BillNumber" placeholder="Enter PropertyID Here" style={{
                  padding: '5px',
                  borderRadius: '10px',
                  borderColor: 'rgb(212, 212, 212)',
                }} onChange={(e) => setBillData({ ...billdata, [e.currentTarget.id]: e.target.value })} />
                <div className="col-sm-3" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <div style={{ position: 'relative', display: 'flex', paddingRight: "8px" }}>
                    <img
                      src="/Search.png"
                      alt="Search"
                      style={{
                        width: '15px',
                        position: 'absolute',
                        top: '30%',
                        left: "5%",
                        cursor: 'pointer',
                      }}
                    />
                    <button type="submit"
                      style={{
                        backgroundImage: '/loginimage.png',
                        height: "3rem",
                        width: '11rem',
                        color: 'white',
                        backgroundColor: '#f1772e',
                        border: 'none',
                        borderRadius: '10px',
                      }}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Loading...' : 'Find Customer'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div style={{ display: "flex", justifyContent: 'space-around', borderRadius: '20px', marginTop: '20px' }}>
          {
            renderdata && renderdata.map((e) => {
              return (
                <>
                  <div class="card " style={{ width: "18rem", marginTop: "10px" }}>
                    <div class="card-body">
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">ID : {e.ID}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">FullName : {e.FullName}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">ContactNumber : {e.ContactNumber}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">AadharNumber : {e.AadharNumber}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">PanNumber : {e.PanNumber}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Address : {e.Address}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Property Age : {e.PropertyAge}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Locality : {e.Locality}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Meter : {e.Meter}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Gala : {e.Gala}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">PermitID : {e.PermitID}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">PermitType : {e.PermitType}</h6>
                    </div>
                  </div>
                  {
                    docs && docs.map((e) => {
                      return (
                        <div class="card" style={{ width: "18rem", marginTop: "10px" }}>
                          <img style={{ borderRadius: '20px' }} src={backend + "/AgentCustomerDocuments/" + e.DocumentName}></img>
                          <div class="card-body">
                            <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Document Name : {e.DocumentName}</h6>
                            <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Doc Id : {e.Doc_id}</h6>
                            {/* <h5 class="card-title">Approval Status : {e.ApprovalStatus}</h5> */}
                            <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Unique Status : {e.UniqueStatus}</h6>
                          </div>
                        </div>
                      )
                    })
                  }
                </>
              )
            })
          }
        </div>
        {renderdata.length > 0 && (
          <div class="d-grid gap-2 d-md-flex justify-content-center mt-3">
            <button onClick={() => Submit("Approved")} class="btn btn-primary me-md-2" type="button">Approve</button>
            <button onClick={() => Submit("Rejected")} class="btn btn-danger" type="button">Reject</button>
          </div>
        )}
      </div>
    </>
  );
};

export default GetCustomer;
