"use client";
import { Agent } from "@/app/AdminContext/AgentManagement";
import React, { useState, useContext, useEffect,useRef } from "react";
import { backend } from '../../../paths'
import { Admin } from "@/app/AdminContext/AdminManageMent";
const GetCustomer = (props) => {

  const statecalls = useContext(Admin);
  const { FindLicence } = statecalls;
  const [renderdata, setRenderData] = useState([])
  const [docs, setDocs] = useState([])
  const [billdata, setBillData] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);

  const getcustomer = async (e) => {
    e.preventDefault();
    console.log("billdata.BillNumber", billdata)
    const data = await FindLicence(billdata);
    console.log("licencdata", data)
    if (data.length > 0) {
      setRenderData(data);
      setDocs(data.docs);
    }
    else {
      alert("Invalid Licence number")
    }
  }

  async function Submit(condition) {
    let approvance = await ApproveApplication(condition, billdata.BillNumber)
    if (approvance) {
      alert("Approvance " + condition)
    } else {

    }
  }

  const handleReset = () => {
    formRef.current.reset();
    setRenderData([]);
  };
  return (
    <>
      <div style={{ backgroundColor: '#f2f4f7', padding: "20px", height: '110vh' }}>

        <div style={{ padding: '20px' }}>
          <img src='/Back-Arrow.png' style={{ width: '30px', cursor: 'pointer', border: '2px solid #968eff', borderRadius: '50px' }} alt="Back" onClick={() => window.history.back()} />
          <div>
            <h5 style={{ fontWeight: '700', padding: '10px' }}><b>Licence Management : Get Licence Details</b></h5>
          </div>
          <div
            style={{ background: "linear-gradient(to right, #ffe1e3, #f9edef)", padding: '10px', borderRadius: '10px', height: '7rem', display: 'flow', paddingTop: ' 1.5rem', justifyContent: 'center', alignItems: 'center' }}>

            <form ref={formRef} onSubmit={getcustomer} style={{ display: "flex", justifyContent: 'center', alignItems: 'baseline', gap: '20px' }}>
              <p style={{ color: "black", fontWeight: '700', fontSize: '18px' }}>
                Licence Tax Details</p>
              <input className="col-sm-6" type="text" id="BillNumber" placeholder="Enter Contact No /Full Name/ Aadharcard No Here" style={{
                padding: '5px',
                borderRadius: '10px',
                borderColor: 'rgb(212, 212, 212)',
              }} onChange={(e) => setBillData(e.target.value)} />
              <div className="col-sm-3" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button type="submit" style={{ background: "linear-gradient(to right, #fc3e04 , #ec931f)", color: "white", fontWeight: '700' }} className="my-2 mx-2 btn">Get Details</button>
                  <button type="button" onClick={handleReset} style={{ backgroundColor: '#eb0000', color: "white", fontWeight: '700' }} className="my-2 btn ">Clear</button>
                </div>
              </div>
            </form>
          </div>

          <div style={{ display: "flex", justifyContent: 'space-around', borderRadius: '20px', marginTop: '20px' }}>
            {
              renderdata && renderdata.map((e) => {
                return (
                  <>
                   <div style={{ display: "grid", justifyContent: 'center', textAlign: 'left', width: "70vw", padding: '15px', marginTop: "15px", backgroundColor: 'white' }}>
                  <h4 style={{ background: 'linear-gradient(185deg, rgba(133,27,43,1) 36%, rgba(133,27,130,1) 68%)', color: 'white', textAlign: 'left', marginTop: "15px" }}>Licence Details</h4>
                  <table style={{ width: '50vw' }} className="table table-success table-striped-columns">
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Licence Registeration No :</td>
                        <td colspan="3">{e.Gala}</td>

                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Name : </td>
                        <td colspan="3">{e.FullName}</td>

                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Plot No : </td>
                        <td colspan="3">{e.Plot_No}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Location : </td>
                        <td colspan="3">{e.Location}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Address : </td>
                        <td colspan="3">{e.Address}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Contact Number : </td>
                        <td colspan="3">{e.ContactNumber}</td>
                      </tr>
                    
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Permit Type: </td>
                        <td colspan="3">{e.PermitType}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold", background: 'linear-gradient(185deg, rgba(130,27,43,1) 36%, rgba(153,37,130,1) 68%)', color: 'white' }}>Approvance : </td>
                        { e.Approvance==="Pending" || e.Approvance==="Rejected" ? <td colspan="3" style={{color:"red",fontWeight:600}}>{e.Approvance}</td> :
                      <td colspan="3" style={{color:"Green" ,fontWeight:600}}>{e.Approvance}</td>
                        }
                      </tr>
                    </tbody>
                  </table>
                </div>
                    {/* <div class="card " style={{ width: "18rem", marginTop: "10px" }}>
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
                        <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">PermitType : {e.Area}</h6>
                        <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">PermitType : {e.status}</h6>
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
                              <h5 class="card-title">Approval Status : {e.ApprovalStatus}</h5>
                              <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Unique Status : {e.UniqueStatus}</h6>
                            </div>
                          </div>
                        )
                      })
                    } */}
                  </>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default GetCustomer;
