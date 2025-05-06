"use client";
import { Customer } from "@/app/AdminContext/CustomerManagement";
import Link from "next/link";
import React, { useState, useContext, useEffect, Suspense } from "react";
import './paybill.css'
const CustomerBill = (props) => {
  const statecalls = useContext(Customer);
  const { GetBills } = statecalls;
  const [renderdata, setRenderData] = useState([]);
  const [BillRender, setBillRender] = useState([]);
  const [billdata, setBillData] = useState({});
  const getBill = async (e) => {
    e.preventDefault();

    if (billdata.BillNumber) {
      const data = await GetBills(billdata.BillNumber);
      if (data.customer.length > 0 || data.BillBreakdown.length > 0) {
        console.log(data?.customer[0])
        setRenderData(data?.customer[0]);
        setBillRender(data?.BillBreakdown)
      } else {
        alert("Please Enter Correct Consumer Number")
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
      <div
        style={{ height: '50vh', display: "grid", justifyContent: "center", alignItems: 'center', backgroundImage: 'url(/Property-Banner.png)', backgroundSize: 'cover' }}
      >

        <form onSubmit={getBill} style={{ height: '13vh', display: "grid" }}>
          <h3 style={{ color: "white", textAlign: 'center', marginBottom: '15px' }}>Municipal Corporation </h3>
          <input
            className="form-control"
            type="text"
            id="BillNumber"
            placeholder="Enter Consumer Number Here"
            onChange={(e) =>
              setBillData({ ...billdata, [e.currentTarget.id]: e.target.value })
            }
          />
          <div style={{ display: "flex", justifyContent: "center", marginTop: '15px' }}>
            <button style={{ backgroundColor: '#ec931f', color: "white" }} className="my-2 mx-2 btn">Get Bill</button>
            <Link
              href={"/Citizen/PayBill/" + billdata.BillNumber}
              className="my-2 mx-2 btn"
              style={{ backgroundColor: '#27b97a', color: "white" }}
              hidden={renderdata?.PropertyID === undefined ? true : false}
            >
              Pay Bill
            </Link>
          </div>
        </form>
      </div>





      <div hidden={renderdata?.PropertyID === undefined ? true : false}>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="bill-container">
            <div className="bill-header">
              {/* <div>
                <img src="https://cdnbbsr.s3waas.gov.in/s3cd4bb35c75ba84b4f39e547b1416fd35/uploads/2021/06/2021062689-300x300.jpg" width="80px" alt="" />
              </div> */}
              <div style={{ color: 'red' }} className="municipal-council"><h1> MUNICIPAL CORPORATION</h1></div>
              <div className="form">Form 17</div>
              <div className="bill-title">Bill (Electricity Tax/Water Tax)</div>
              <div className="financial-year">{new Date(singleBill?.FromDate + 'T00:00:00').getFullYear()}-{new Date(singleBill?.ToDate).getFullYear()}</div>
            </div>


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
                <div>Bill date: {renderdata?.ToDate}</div>
                <div>Property Type : {renderdata?.PropertyType}</div>
              </div>
              <div className="innerheader" >
                <div className="assessment-title">impressive Date : / / </div>
                <div className="impressive-date">Assessment: {renderdata?.Amount}</div>
              </div>
            </div>

            <div style={{ border: '1px black solid', padding: '5px', backgroundColor: '#e9f8f1' }}>
              <div className="innerheader" >
                <div>Name and address of: {renderdata?.Address}</div>
                <div>Mobile No :{renderdata?.ContactNumber}</div>
              </div>
              <div className="innerheader" >
                <div>{renderdata?.FullName}</div>
                <div>{renderdata?.uniqueness}</div>
              </div>
            </div>



            <div style={{ border: '1px black solid' }}>
              <div className="tax-details-title" style={{ textAlign: 'center' }}>Details of Taxes</div>
              <div className="tax-table" style={{ display: 'grid', justifyContent: 'center', width: '100%' }}>
                <table className="table table-striped tax-table-data" style={{ width: '52vw' }}>
                  <thead className="table-dark">
                    <tr>
                      <th>Tax</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>

                    <Suspense>
                      {
                        BillRender && BillRender.map((xe) => {
                          console.log(xe.Amount);
                          return (
                            <tr>
                              <td style={{ width: "25%", textAlign: "center" }}>

                                <b>{xe.Particulars}</b>
                              </td>
                              <td align="center" style={{ width: "25%" }}>
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
              <div className="update-date">Update Date: 28/02/2024</div>
              <div className="update-by">Update By: ADMIN</div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default CustomerBill;