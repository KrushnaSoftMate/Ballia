"use client";
import { Agent } from '@/app/AdminContext/AgentManagement';
import React, { useState, useContext, useEffect } from "react";
import { backend } from '../../../paths'
const GetCustomer = (props) => {

  const statecalls = useContext(Agent);
  const { FindCustomer } = statecalls;
  const [renderdata, setRenderData] = useState([])
  const [docs, setDocs] = useState([])
  const [billdata, setBillData] = useState({})
  const [isLoading, setIsLoading] = useState(false);


  const getcustomer = async (e) => {
    e.preventDefault();
    const data = await FindCustomer(billdata.BillNumber);
      setRenderData(data.customer);
      setDocs(data.docs);
  }



  return (
    <>
      <div style={{ backgroundColor: '#f2f4f7', padding: "20px", height: '110vh' }}>
        {/* <form onSubmit={getcustomer} style={{ width: "20vw", display: "grid" }}>
          <input className="form-control" type="text" id="BillNumber" placeholder="Enter PropertyID Here" onChange={(e) => setBillData({ ...billdata, [e.currentTarget.id]: e.target.value })} />
          <button className="my-2 btn btn-success">Get Customer</button>
        </form> */}

        <div>
          <h5><b>Owner Management : Get Owner</b></h5>
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
                  <b>Enter Consumer No</b>
                </h5>
                <input className="col-sm-6" type="text" id="BillNumber" placeholder="Enter ConsumerNo Here" style={{
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
                      {isLoading ? 'Loading...' : 'Find Owner'}
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
                    <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Consumer No: {e.PropertyID}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Owner Name : {e.FullName}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Father/Guardian Name: {e.FatherorGaurdianName}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Contact No: {e.ContactNumber}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Plot No : {e.Plot_No}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Total Area : {e.TotalArea}</h6>
                      {/* <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Area Use : {e.Area_Use}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Talo ki Sankhya : {e.Talo_ki_Sankhya}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Property Type : {e.PropertyType}</h6> */}
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Property Year : {e.PropertyAge}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Location : {e.location}</h6>
                      {/* <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Address : {e.Address}</h6> */}
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Zone : {e.Zone}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Ward : {e.Ward}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Mohalla : {e.Mohalla}</h6>
                     
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Meter : {e.Meter}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Electricity Connection : {e.ElectricityConnection}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Water Connection : {e.WaterConnection}</h6>
                      {/* <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Locality : {e.locality}</h6> */}
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Total ARV : {e.TotalArv}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} className="card-title">Approvance:{e.Approvance}</h6>
                    </div>
                  </div>
                  {
                    docs && docs.map((e) => {
                      return (
                        <div class="card" style={{ width: "18rem", marginTop: "10px" }}>
                          <img style={{ borderRadius: '20px' }} src={backend + "/CustomerDocuments/" + e.Document_Name}></img>
                          <div class="card-body">
                            <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Document Name : {e.Document_Name}</h6>
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

      </div>
    </>
  );
};

export default GetCustomer;
