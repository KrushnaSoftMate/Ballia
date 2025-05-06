"use client";
import { Customer } from "@/app/AdminContext/CustomerManagement";
import React, { useState, useContext, useEffect, useRef } from "react";
const CustomerDetails = (props) => {
  const statecalls = useContext(Customer);
  const { GetCustomerDetails } = statecalls;
  const [renderdata, setRenderData] = useState([])
  const [billdata, setBillData] = useState({})
  const customernum = useRef();
  const formRef = useRef(null);


  const getDetails = async (e) => {
    e.preventDefault();
    if (billdata.Para) {
      const data = await GetCustomerDetails(billdata.Para);
      console.log(data);
      if (data.length > 0) {
        setRenderData(data)
      } else {
        alert("Please Enter Correct Details")
        setRenderData([])
      }
    } else {
      alert("Please Enter Details")
      setRenderData([])
    }
  }

  const handleReset = () => {
    formRef.current.reset();
    setRenderData([]);
  };

  return (
    <>
      <div style={{ padding: '20px' }}>
        <img src='/Back-Arrow.png' style={{ width: '30px', cursor: 'pointer', border: '2px solid #968eff', borderRadius: '50px' }} alt="Back" onClick={() => window.history.back()} />
        <h5 style={{ fontWeight: '700', padding: '10px' }}>Customer Details</h5>
        <div style={{ background: "linear-gradient(to right, #ffe1e3, #f9edef)", padding: '10px', borderRadius: '10px', height: '7rem', display: 'flow', paddingTop: ' 1.5rem', justifyContent: 'center', alignItems: 'center' }}>
          <form ref={formRef} onSubmit={getDetails} style={{ display: "flex", justifyContent: 'center', alignItems: 'baseline', gap: '20px' }}>
            <p style={{ color: "black", fontWeight: '700', fontSize: '18px' }}>Property Tax Details</p>
            <input style={{ width: '45%' }} className="form-control" type="text" id="Para" placeholder="Enter Name/Contact/AadharCard" onChange={(e) => setBillData({ ...billdata, [e.currentTarget.id]: e.target.value })} ref={customernum} />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button type="submit" style={{ background: "linear-gradient(to right, #fc3e04 , #ec931f)", color: "white", fontWeight: '700' }} className="my-2 mx-2 btn">Get Details</button>
              <button type="button" onClick={handleReset} style={{ backgroundColor: '#eb0000', color: "white", fontWeight: '700' }} className="my-2 btn ">Clear</button>
            </div>
          </form>
        </div>
        <div style={{ display: "grid", justifyContent: 'center', backgroundColor: '#f2fcf7' }}>
          {
            renderdata && renderdata.map((e) => {
              return (
                <>

                  {/* <div style={{display:"flex",justifyContent:'space-between',textAlign:'left', width: "30rem",padding:'15px', marginTop: "15px",backgroundColor:'white' }}>
                    <div style={{backgroundColor:'#f2fcf7'}}>
                      <h5 className="">PropertyID : </h5>
                      <h5 className="">Name : </h5>
                      <h5 className="">Plot No. : </h5>
                      <h5 className="">Location :</h5>
                      <h5 className="">Address :</h5>
                      <h5 className="">Ward :</h5>
                      <h5 className="">Zone :</h5>
                      <h5 className="">Locality :</h5>
                    </div>
                    <div  style={{backgroundColor:'#f2fcf7'}}>
                      <h5 className="">{e.PropertyID}</h5>
                      <h5 className="">{e.FullName}</h5>
                      <h5 className="">{e.Plot_No}</h5>
                      <h5 className="">{e.location}</h5>
                      <h5 className="">{e.Address}</h5>
                      <h5 className="">{e.Ward}</h5>
                      <h5 className="">{e.Zone}</h5>
                      <h5 className="">{e.locality}</h5>
                    </div>
                  </div> */}
                  <div style={{ display: "grid", justifyContent: 'center', textAlign: 'left', width: "70vw", padding: '15px', marginTop: "15px", backgroundColor: 'white' }}>
                    <h4 style={{ background: 'linear-gradient(185deg, rgba(133,27,43,1) 36%, rgba(133,27,130,1) 68%)', color: 'white', textAlign: 'left', marginTop: "15px" }}>Property Tax Details</h4>
                    <table style={{ width: '50vw' }} className="table table-success table-striped-columns">
                      <tbody>
                        <tr>
                          <td style={{ fontWeight: "bold" }}>PropertyID :</td>
                          <td colspan="3">{e.PropertyID}</td>

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
                          <td colspan="3">{e.location}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "bold" }}>Address : </td>
                          <td colspan="3">{e.Address}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "bold" }}>Ward : </td>
                          <td colspan="3">{e.Ward}</td>
                        </tr>

                        <tr>
                          <td style={{ fontWeight: "bold" }}>Locality : </td>
                          <td colspan="3">{e.locality}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "bold", background: 'linear-gradient(185deg, rgba(130,27,43,1) 36%, rgba(153,37,130,1) 68%)', color: 'white' }}>Approvance : </td>
                          {e.Approvance === "Pending" || e.Approvance === "Rejected" ? <td colspan="3" style={{ color: "red", fontWeight: 600 }}>{e.Approvance}</td> :
                            <td colspan="3" style={{ color: "Green", fontWeight: 600 }}>{e.Approvance}</td>
                          }
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "bold" }}>Remark : </td>
                          <td colspan="3">{e.Remark ? e.Remark : "--"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )
            })

          }
        </div>

      </div>
    </>
  );
};

export default CustomerDetails;
