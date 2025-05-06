"use client";
import { Admin } from "@/app/AdminContext/AdminManageMent";
import React, { useState, useContext, useEffect } from "react";
import { backend } from '../../../paths'
const GetCustomer = (props) => {

  const statecalls = useContext(Admin);
  const { FindCustomer, ApproveApplication } = statecalls;
  const [renderdata, setRenderData] = useState([])
  const [docs, setDocs] = useState([])
  const [getarea, setArea] = useState([])
  const [billdata, setBillData] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [houseTax, setHouseTax] = useState(null);
  const [waterTax, setWaterTax] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [Remark, setremark] = useState("");
  const [hideremark, setHideRemark] = useState(false);


  const getcustomer = async (e) => {
    e.preventDefault();
    const trimmedBillNumber = billdata.BillNumber?.trim(); // Trim white spaces
    console.log("trimmedBillNumber", trimmedBillNumber);

    const data = await FindCustomer(trimmedBillNumber);
    // if (data.customer[0].Approvance != "Pending") {
    setRenderData(data.customer);
    setDocs(data.docs);

    const house = data.bill.find((item) => item.Particulars === "House Tax");
    const water = data.bill.find((item) => item.Particulars === "Water Tax");
    const total = data.bill.find((item) => item.Particulars === "Total");

    setHouseTax(house);
    setWaterTax(water)
    setTotalAmount(total);

    // }
    // else {
    //   alert(`Customer is ${data.customer[0].PropertyID} in Pending Phase !! No Bill Generated !!`)
    //   window.location.reload();
    // }

    console.log("Customer Data :: ", data);
  }
  console.log(houseTax);

  async function Submit(condition) {
    if (condition == "Rejected") {
      setHideRemark(true);

      if (Remark == "") {
        return alert("Enter Remark So Customer Should know why Rejected there Application !!!!");
      }

      let approvance = await ApproveApplication(condition, billdata.BillNumber, Remark);
      if (approvance) {
        alert("Approval : " + condition);
        window.location.reload();
      } else {
        alert("Error while approval !!!");
      }

    }
    else {
      let approvance = await ApproveApplication(condition, billdata.BillNumber);
      if (approvance) {
        alert("Approval : " + condition);
        window.location.reload();
      } else {
        alert("Error while approval !!!");
      }
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
          <h5><b>Customer Management : Get Customer Details</b></h5>
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
              <div className="col" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <h5 htmlFor="NI_Type" className="form-label" style={{ textAlign: 'center', padding: '8px 0px', fontSize: '15px' }}>
                  <b>Enter Consumer No</b>
                </h5>
                <input className="col-sm-4" type="text" id="BillNumber" placeholder="Enter ConsumerNo Here" style={{
                  padding: '5px',
                  borderRadius: '10px',
                  borderColor: 'rgb(212, 212, 212)',
                }} onChange={(e) => setBillData({ ...billdata, [e.currentTarget.id]: e.target.value })} />
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
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
                        height: "2.5rem",
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

        <div style={{ display: "flex", justifyContent: 'space-around', borderRadius: '20px', marginTop: '20px' }}>
          {
            renderdata &&
            renderdata.map((e) => {
              return (
                <>
                  <div class="card " style={{ width: "25rem", marginTop: "10px" }}>
                    <div class="card-body">
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">consumer no: {e.PropertyID}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Customer Name : {e.FullName}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Father/Guardian Name: {e.FatherorGaurdianName}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Contact No: {e.ContactNumber}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Plot No : {e.Plot_No}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Total Area : {e.TotalArea}</h6>
                      {/* <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Area Use : {e.Area_Use}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Talo ki Sankhya : {e.Talo_ki_Sankhya}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Property Type : {e.PropertyType}</h6> */}
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Property Age : {e.PropertyAge}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Location : {e.location}</h6>
                      {/* <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Address : {e.Address}</h6> */}
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Zone : {e.Ward}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Ward : {e.Ward}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Mohalla : {e.Ward}</h6>

                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Meter : {e.Meter}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Electricity Connection : {e.ElectricityConnection ? "Yes" : "No"}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Water Connection : {e.WaterTaxConnection ? "Yes" : "No"}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Sewer Connection : {e.SewerConnection ? "Yes" : "No"}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Total ARV : {Math.round(e.TotalARV)}</h6>
                      {/* <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Property Tax : {houseTax ? Math.round(Number(houseTax.Amount)) : 0}</h6>
                      <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Water Tax : {waterTax ? Math.round(Number(waterTax.Amount)) : 0}</h6> */}
                      <h6 style={{ borderBottom: '1px solid gray' }} className="card-title">Approvance:{e.Approvance}</h6>
                    </div>
                  </div>

                  <div class="card" style={{ width: "18rem", height: "30rem", marginTop: "10px", overflowY: "scroll" }}>
                    <div class="card-body">
                      {
                        getarea && getarea.map((e) => {
                          return (
                            <>
                              <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Property for : {e.PropertyforUse}</h6>
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>Construction Type</th>
                                    <th>Area</th>
                                    <th>ARV</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {getarea && getarea
                                    // Filter based on PropertyforUse
                                    .filter(area => area.PropertyforUse === e.PropertyforUse)
                                    .map((filteredArea, index) => (
                                      <tr key={index}>
                                        <td>{filteredArea.ConstructionType}</td>
                                        <td>{filteredArea.sqft}</td>
                                        <td>{Math.round(filteredArea.Arv)}</td>
                                      </tr>
                                    ))
                                  }
                                </tbody>
                              </table>
                            </>
                          )
                        })
                      }
                    </div>
                  </div>

                  {
                    docs && docs.map((e) => {
                      return (
                        <div class="card" style={{ width: "18rem", height: "18rem", marginTop: "10px" }}>
                          <img style={{ borderRadius: '20px' }} src={`${backend}/CustomerDocuments/${e.Document_Name}`}></img>
                          <a style={{ textAlign: 'center' }} href={`${backend + "/CustomerDocuments/" + e.Document_Name}`} target="blank" >View File</a>
                          <div class="card-body">
                            <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Document Name : {e.Document_Name}</h6>
                            {/* <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Doc Id : {e.Doc_id}</h6>
                            <h5 class="card-title">Approval Status : {e.ApprovalStatus}</h5>
                            <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Unique Status : {e.UniqueStatus}</h6> */}
                          </div>
                        </div >
                      )
                    })
                  }
                </>
              )
            })
          }
        </div>

        {
          hideremark &&
          <div className="col-12">
            <div className="col-5">
              <div className="row">
                <div className="col-4">
                  <label htmlFor="" className="fw-bold">Remark <span className="text-danger">*</span></label>

                </div>

                <div className="col-8">
                  <textarea type="text" className="form-control" placeholder="Enter Remark" onChange={(e) => setremark(e.target.value)} />
                </div>

              </div>
            </div>
          </div>
        }

        {renderdata.length > 0 && (
          <div class="d-grid gap-2 d-md-flex justify-content-center mt-3">
            <button onClick={() => Submit("Approved")} class="btn btn-primary me-md-2" type="button">Approve</button>
            <button onClick={() => Submit("Rejected")} class="btn btn-danger" type="button">Reject</button>
          </div>
        )}
      </div >
    </>
  );
};

export default GetCustomer;
