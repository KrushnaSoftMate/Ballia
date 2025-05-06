"use client";
import { Customer } from "@/app/AdminContext/CustomerManagement";
import Link from "next/link";
import React, { useState, useContext, useEffect, Suspense } from "react";
import './bill.css'
import { usePDF } from 'react-to-pdf';
import QRCode from "react-qr-code";
import { frontend } from "@/app/paths";

const ViewBill = (props) => {
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
  const statecalls = useContext(Customer);
  const { ViewBills } = statecalls;
  const [renderdata, setRenderData] = useState([])
  const [BillRender, setBillRender] = useState([]);
  const [billdata, setBillData] = useState({})
  const [interestdata, setInterestdata] = useState(0)
  const [dueamounntdata, setDueamounntData] = useState(0);
  const [CustomerBillData, setCustomerBillData] = useState([]);
  const [show, setShow] = useState(false);
  const [singleBill, setSingleBill] = useState(null);
  const [CustomerData, setCustomerData] = useState();


  const viewBill = async (e) => {
    e.preventDefault();
    if (billdata.BillNumber) {
      const trimmedBillNumber = billdata.BillNumber?.trim(); // Trim white spaces

      const data = await ViewBills(trimmedBillNumber);

      console.log("BIll Data", data);
      if (data.customer.length > 0 || data.BillBreakdown.length > 0) {
        let dueamounnt = Math.ceil((data?.customer[0]?.DueAmount) / 1.1);
        setCustomerBillData(data.customer);
        setCustomerData(data.customerinfo[0]);
        setDueamounntData(dueamounnt)
        let interest = Math.ceil((data?.customer[0]?.DueAmount) - dueamounnt)
        setInterestdata(interest)
        console.log(interest);
        console.log(dueamounnt);
        setRenderData(data?.customer[0]);
        setBillRender(data?.BillBreakdown)
      } else {
        alert("No Bill found ! Please Check Consumer Number !!")
        setRenderData([])
        setBillRender([])
      }
    } else {
      alert('Please Enter Consumer Number')
      setRenderData([])
      setBillRender([])
    }
  }

  console.log(CustomerBillData);

  const handleFormShow = (billID) => {
    let res = CustomerBillData.filter((item) => item.BillNumber == billID);
    setSingleBill(res[0]);
    setShow(true);
  }




  return (
    <>

      <div style={{ padding: '20px' }}>
        <img src='/Back-Arrow.png' style={{ width: '30px', cursor: 'pointer', border: '2px solid #968eff', borderRadius: '50px' }} alt="Back" onClick={() => window.history.back()} />
        <h5 style={{ fontWeight: '700', padding: '10px' }}>View Bill</h5>

        <div className="col-12" style={{ backgroundColor: "#F4F8FF" }}>

          <div style={{ background: "linear-gradient(to right, #ffe1e3, #f9edef)", padding: '10px', borderRadius: '10px', height: '7rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <form className="col-12" onSubmit={viewBill} style={{ display: "flex", justifyContent: 'center', alignItems: 'baseline', gap: '20px' }}>
              <p style={{ color: "black", fontWeight: '700', fontSize: '18px' }}>Municipal Corporation</p>
              <input className=" form-control" style={{ width: '45%' }} type="text" id="BillNumber" placeholder="Enter Consumer Number Here" onChange={(e) => setBillData({ ...billdata, [e.currentTarget.id]: e.target.value })} />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button style={{ background: "linear-gradient(to right, #fc3e04 , #ec931f)", color: "white", fontWeight: '700' }} className="my-2 mx-2 btn">View Bill</button>
                {/* <button style={{ backgroundColor: 'tranparent', color: "blue", border: '1px solid blue' }} className="my-2 mx-2 btn" onClick={toPDF} hidden={renderdata?.PropertyID === undefined ? true : false}>Print Bill</button> */}
              </div>
            </form>
          </div>


          {
            CustomerBillData &&
            <div className="col-12 my-4">
              <div className="col-11 m-auto tableContainer">
                <table className="col-12">
                  <thead>

                    <tr>
                      <th style={{ width: "4%" }}>Sr.NO</th>
                      <th style={{ width: "20%", textAlign: "start" }}>Bill Number</th>
                      <th style={{ width: "10%" }}>From </th>
                      <th style={{ width: "10%" }}>To</th>

                      <th style={{ width: "10%" }}>View</th>
                      {/* <th style={{ width: "10%" }}>Pay</th> */}
                    </tr>
                  </thead>

                  <tbody>
                    {
                      CustomerBillData && CustomerBillData.length > 0 ? (
                        CustomerBillData.filter((item) => item.Status == "NotDump").map((val, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{val.BillNumber}</td>
                            <td>{val.FromDate?.split("T")[0]}</td> {/* Optional: Format the date */}
                            <td>{val.ToDate?.split("T")[0]}</td>
                            <td><button className="btn btn-success" onClick={() => handleFormShow(val.BillNumber)}>View</button></td>
                            {/* <td><button className="btn btn-primary">Pay</button></td> */}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="fw-bold text-center">No Data Found !!</td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
              </div>
            </div>
          }



          {
            show &&
            <div className="col-12">

              <div className="bill-container m-auto" ref={targetRef}>
                <div className="bill-header">
                  <div>
                    <img src="/BALLIA-Logo512.png" width="100px" alt="" />
                  </div>
                  <div style={{ color: 'red' }} className="municipal-council"><h1>MUNICIPAL CORPORATION</h1></div>
                  <div className="form">Form 17</div>
                  <div className="bill-title">Bill (House Tax/Water Tax)</div>
                  <div className="financial-year">Financial year {new Date(singleBill?.FromDate + 'T00:00:00').getFullYear()}-{new Date(singleBill?.ToDate).getFullYear()}</div>
                </div>
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "12%", width: "12%" }}
                  value={frontend + '/Customer/PayBill/' + CustomerData?.PropertyID}
                  href={frontend + '/Customer/PayBill/' + CustomerData?.PropertyID}
                  viewBox={`0 0 256 256`}
                />
                <p className="">Pay your Bill</p>
                <div className="estate-details">
                  <div className="estate-code">Estate Code: {CustomerData?.PropertyID}</div>
                  <div className="ward">{CustomerData?.uniqueness}</div>
                </div>

                <div style={{ border: '1px black solid', padding: '5px', backgroundColor: '#fde8e9' }}>
                  <div className="innerheader my-1" >
                    <div style={{ color: '#f82228' }}>Bill number: {singleBill?.BillNumber}</div>
                    <div>House number: {CustomerData?.Plot_No}</div>
                  </div>
                  <div className="innerheader my-1" >
                    <div>Bill date: {singleBill?.Creation_Date.split("T")[0]}</div>
                    <div>Property Type: {CustomerData?.PropertyType == 1 ? "Residential" : "Commercial"}</div>
                  </div>
                  <div className="innerheader my-1" >

                    <div className="impressive-date">Assessment: {singleBill?.Amount}</div>
                  </div>
                </div>

                <div style={{ border: '1px black solid', padding: '5px', backgroundColor: '#e9f8f1' }}>
                  <div className="innerheader my-1" >
                    <div>Address: {CustomerData?.Ward}</div>
                    <div>Mobile No : {CustomerData?.ContactNumber}</div>
                  </div>
                  <div className="innerheader my-1" >
                    <div>FullName : {CustomerData?.FullName}</div>
                    <div>{CustomerData?.uniqueness}</div>
                  </div>
                </div>



                <div className="col-12 p-0 my-3 appleConatiner pt-2" style={{ border: '1px solid black' }}>
                  <h5 className=" mb-3 col-12 p-0" style={{ textAlign: 'center' }}><b>Details of Taxes</b></h5>
                  <div className="col-12 p-0">
                    <table className="col-12">
                      <thead className="table-dark">
                        <tr>
                          <th style={{ width: "40%", textAlign: "center" }}>Tax</th>
                          <th style={{ width: "50%", textAlign: "center" }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>

                        <Suspense>
                          {
                            BillRender && BillRender.map((xe) => {
                              console.log(xe.Amount);
                              return (
                                <tr>
                                  <td style={{ textAlign: "center" }}>
                                    <b>{xe.Particulars}</b>
                                  </td>
                                  <td className="text-center">
                                    <span id="lbl_genTax2">{xe.Amount}</span>
                                  </td>
                                </tr>
                              )
                            })
                          }
                        </Suspense>
                        <tr className="table-danger">
                          <td style={{ width: '25%', textAlign: 'center' }}>
                            <b>Due Amount</b>
                          </td>
                          <td align="center" style={{ width: '25%' }}>
                            <span id="lbl_genTax2">{singleBill?.DueAmount}</span>
                          </td>
                        </tr>
                        <tr className="table-danger">
                          <td style={{ width: '25%', textAlign: 'center' }}>
                            <b>Interest</b>
                          </td>
                          <td align="center" style={{ width: '25%' }}>
                            <span id="lbl_genTax2">{interestdata}</span>
                          </td>
                        </tr>
                        <tr className="table-danger">
                          <td style={{ width: '25%', textAlign: 'center' }}>
                            <b>Discount</b>
                          </td>
                          <td align="center" style={{ width: '25%' }}>
                            <span id="lbl_genTax2">{singleBill?.Discount}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ width: '25%', textAlign: 'center' }}>
                            <b>Paid Amount</b>
                          </td>
                          <td align="center" style={{ width: '25%' }}>
                            <span id="lbl_genTax2">{singleBill?.PaidAmount}</span>
                          </td>
                        </tr>
                        <tr className="table-success">
                          <td style={{ width: '25%', textAlign: 'center' }}>
                            <b>Total Payable</b>
                          </td>
                          <td align="center" style={{ width: '25%' }}>
                            <span id="lbl_genTax2">{singleBill?.Remaining}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div style={{ fontSize: '18px', fontWeight: "500" }}>
                  <div className="note">
                    1) While generating bill Keep these thing in your Note that 10% discount is they are providing for customer if the Customer is paying the bill In First Three Months Of Pay bill time duration ,
                  </div>
                  <div className="note">
                    2. The property tax of the building is based on the data obtained in the survey. Whose details are available in the computer room of the Municipal Corporation, if there is any objection then objection can be made within one month.
                  </div>
                  <div className="note">
                    3. A computerized receipt can be obtained by depositing money in the computer room of the Municipal Council.
                  </div>
                  <div className="update-date">Update Date: {singleBill?.Creation_Date.split("T")[0]}</div>
                  <div className="update-by">Update By: ADMIN</div>
                </div>




              </div>

              <div className="col-12 text-center my-3">
                <button className="btn btn-primary px-4" onClick={toPDF}>Print</button>
                <button className="btn btn-danger px-4 mx-3" onClick={() => { setShow(false); setBillData({}) }}>Close</button>
              </div>

            </div>

          }



        </div>

      </div>




    </>
  );
};

export default ViewBill;
