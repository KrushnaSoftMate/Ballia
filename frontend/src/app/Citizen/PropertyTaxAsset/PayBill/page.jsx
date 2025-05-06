"use client";
import { Customer } from "@/app/AdminContext/CustomerManagement";
import Link from "next/link";
import React, { useState, useContext, useEffect, Suspense } from "react";
import './paybill.css';
import QRCode from "react-qr-code";
import { frontend } from "@/app/paths";

const CustomerBill = (props) => {
  const statecalls = useContext(Customer);
  const { GetBills } = statecalls;
  const [renderdata, setRenderData] = useState([]);
  const [BillRender, setBillRender] = useState([]);
  const [billdata, setBillData] = useState({});
  const [show, setShow] = useState(false);
  const getBill = async (e) => {
    e.preventDefault();

    const trimmedBillNumber = billdata.BillNumber?.trim(); // Trim white spaces

    if (trimmedBillNumber) {
      const data = await GetBills(trimmedBillNumber);
      console.log("Data i get  : ", data);
      if (data.customer.length > 0 || data.BillBreakdown.length > 0) {
        setRenderData(data?.customer[0]);
        setBillRender(data?.BillBreakdown)
        setShow(true)
      } else {
        alert("No bill found for this customer !!")
        setRenderData([])
        setBillRender([])
      }
    } else {
      alert('Please Enter Consumer Number')
      setRenderData([])
      setBillRender([])
    }
  };
  async function GetHashKey(x) {
    // console.log(x);
  }
  return (
    <>
      <div style={{ padding: '20px' }}>
        <img src='/Back-Arrow.png' style={{ width: '30px', cursor: 'pointer', border: '2px solid #968eff', borderRadius: '50px' }} alt="Back" onClick={() => window.history.back()} />
        <h5 style={{ fontWeight: '700', padding: '10px' }}>Pay Bill</h5>
        <div style={{ background: "linear-gradient(to right, #ffe1e3, #f9edef)", padding: '10px', borderRadius: '10px', height: '7rem', display: 'flow', paddingTop: ' 1.5rem', justifyContent: 'center', alignItems: 'center' }}>

          <form onSubmit={getBill} style={{ display: "flex", justifyContent: 'center', alignItems: 'baseline', gap: '20px' }}>
            <p style={{ color: "black", fontWeight: '700', fontSize: '18px' }}>Municipal Corporation</p>
            <input className="form-control" style={{ width: '45%' }} type="text" id="BillNumber" placeholder="Enter Consumer Number Here" onChange={(e) =>
              setBillData({ ...billdata, [e.currentTarget.id]: e.target.value })} />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button style={{ background: "linear-gradient(to right, #fc3e04 , #ec931f)", color: "white", fontWeight: '700' }} className="my-2 mx-2 btn">Get Bill</button>
              <Link
                href={"/Citizen/PropertyTaxAsset/PayBill/" + billdata.BillNumber}
                className="my-2 mx-2 btn"
                style={{ backgroundColor: '#27b97a', color: "white" }}
                hidden={renderdata?.PropertyID === undefined ? true : false}
              >
                Pay Bill
              </Link>
            </div>
          </form>
        </div>



        {
          show &&

          <div className="col-12">
            <div className="bill-container m-auto">
              <div className="bill-header">
                <div>
                <img src="/BALLIA-Logo512.png" width="100px" alt="Ballia Logo" />
                </div>
                <div style={{ color: 'red' }} className="municipal-council"><h1> MUNICIPAL CORPORATION</h1></div>
                <div className="form">Form 17</div>
                <div className="bill-title">Bill (Electricity Tax/Water Tax)</div>
                <div className="financial-year">Financial year {new Date(renderdata?.FromDate + 'T00:00:00').getFullYear()}-{new Date(renderdata?.ToDate).getFullYear()}</div>
              </div>

              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "10%", width: "10%" }}
                value={frontend + '/Customer/PayBill/' + renderdata?.PropertyID}
                href={frontend + '/Customer/PayBill/' + renderdata?.PropertyID}
                viewBox={`0 0 256 256`}
              />
              <p>Pay your Bill</p>


              <div className="estate-details">
                <div className="estate-code">Estate Code: {renderdata?.PropertyID}</div>
                <div className="ward">{renderdata?.uniqueness}</div>
              </div>



              <div style={{ border: '1px black solid', padding: '5px', backgroundColor: '#fde8e9' }}>
                <div className="innerheader" >
                  <div style={{ color: '#f82228' }}>Bill number: {renderdata?.BillNumber}</div>
                  <div>House number: {renderdata?.Plot_No}</div>
                </div>
                <div className="innerheader" >
                  <div>Bill date: {renderdata?.ToDate.split("T")[0]}</div>
                  <div>Property Type : {renderdata?.PropertyType}</div>
                </div>
                <div className="innerheader" >
                  {/* <div className="assessment-title">impressive Date : / / </div> */}
                  <div className="impressive-date">Assessment: {renderdata?.Amount}</div>
                </div>
              </div>

              <div style={{ border: '1px black solid', padding: '5px', backgroundColor: '#e9f8f1' }}>
                <div className="innerheader" >
                  <div>Address: {renderdata?.Address}</div>
                  <div>Mobile No :{renderdata?.ContactNumber}</div>
                </div>
                <div className="innerheader" >
                  <div>Full Name : {renderdata?.FullName}</div>
                  <div>{renderdata?.uniqueness}</div>
                </div>
              </div>



              <div className="col-12 p-0 my-3 appleConatiner" style={{ border: '1px solid black' }}>
                <div className=" mb-3 col-12 p-0" style={{ textAlign: 'center' }}>Details of Taxes</div>
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
                          <b>DueAmount</b>
                        </td>
                        <td align="center" style={{ width: '25%' }}>
                          <span id="lbl_genTax2">{renderdata?.DueAmount}</span>
                        </td>
                      </tr>
                      <tr className="table-danger">
                        <td style={{ width: '25%', textAlign: 'center' }}>
                          <b>Discount</b>
                        </td>
                        <td align="center" style={{ width: '25%' }}>
                          <span id="lbl_genTax2">{renderdata?.Discount}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: '25%', textAlign: 'center' }}>
                          <b>Paid Amount</b>
                        </td>
                        <td align="center" style={{ width: '25%' }}>
                          <span id="lbl_genTax2">{renderdata?.PaidAmount}</span>
                        </td>
                      </tr>
                      <tr className="table-success">
                        <td style={{ width: '25%', textAlign: 'center' }}>
                          <b>Total Payable</b>
                        </td>
                        <td align="center" style={{ width: '25%' }}>
                          <span id="lbl_genTax2">{renderdata?.Remaining}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <div className="note">
                  1. The amount of this bill should be paid within 15 days of presentation of the bill, otherwise a notice of demand will be issued and if necessary, warrants for confiscation and attachment will also be issued.
                </div>
                <div className="note">
                  2. The property tax of the building is based on the data obtained in the survey. Whose details are available in the computer room of the Municipal Corporation, if there is any objection then objection can be made within one month.
                </div>
                <div className="note">
                  3. A computerized receipt can be obtained by depositing money in the computer room of the Municipal Council.
                </div>
                <div className="update-date">Update Date:  {renderdata?.Creation_Date.split("T")[0]}</div>
                <div className="update-by">Update By: ADMIN</div>
              </div>
            </div>
          </div>

        }

      </div>

    </>
  );
};

export default CustomerBill;