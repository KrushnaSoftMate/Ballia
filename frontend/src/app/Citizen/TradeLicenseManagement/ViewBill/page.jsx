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
  const { ViewLicenceBills } = statecalls;
  const [renderdata, setRenderData] = useState([])
  const [BillRender, setBillRender] = useState([]);
  const [billdata, setBillData] = useState({})
  const [interestdata, setInterestdata] = useState(0)
  const [dueamounntdata, setDueamounntData] = useState(0)
const[currentbillamount,setCurrentBillAmount]=useState(0)

  const viewBill = async (e) => {
    e.preventDefault();
    if (billdata.BillNumber) {
      const data = await ViewLicenceBills(billdata.BillNumber);
      console.log("datalicence",data)
      if (data.length > 0 ) {
        setDueamounntData(data[0].DueAmount)
        let currentammount=Math.ceil(data[0].TotalAmount-(data[0].DueAmount))
        setCurrentBillAmount(currentammount)
        setRenderData(data[0]);

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
  }

  return (
    <>

      <div style={{ height: '50vh', display: "grid", justifyContent: "center", alignItems: 'center', backgroundImage: 'url(/Property-Banner.png)', backgroundSize: 'cover' }}>
        <form onSubmit={viewBill} style={{ height: '13vh', display: "grid", }}>
          <h3 style={{ color: "white", textAlign: 'center', marginBottom: '15px' }}>Municipal Corporation</h3>
          <input className="form-control" type="text" id="BillNumber" placeholder="Enter Consumer Number Here" onChange={(e) => setBillData({ ...billdata, [e.currentTarget.id]: e.target.value })} />
          <div style={{ display: "flex", justifyContent: "center", marginTop: '15px' }}>
            <button style={{ backgroundColor: '#ec931f', color: "white" }} className="my-2 mx-2 btn">View Bill</button>
            <button style={{ backgroundColor: 'tranparent', color: "white", border: '1px solid white' }} className="my-2 mx-2 btn" onClick={toPDF} hidden={renderdata?.Gala === undefined ? true : false}>Print Bill</button>
            <Link
                href={"/Citizen/TradeLicenseManagement/PayLicenseBill/" + renderdata?.Gala} 
                className="my-2 mx-2 btn"
                style={{ backgroundColor: '#27b97a', color: "white" }}
                hidden={renderdata?.Gala === undefined ? true : false}
              >
                Pay Bill
              </Link>
          </div>
        </form>
      </div>
      <div hidden={renderdata?.Gala === undefined ? true : false} style={{ display: "flex", justifyContent: "center", backgroundColor: '#e9f8f1' }}>

        <div className="bill-container" ref={targetRef}>
          <div className="bill-header">
            <div style={{ color: 'red' }} className="municipal-council"><h3>MUNICIPAL CORPORATION BALLIA</h3></div>
            <div className="bill-title">Licence Bill</div>
            <div className="financial-year">Financial year 2024-2025</div>
          </div>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "10%", width: "10%" }}
            value={frontend + '/Customer/PayBill/' + renderdata?.Gala}
            href={frontend + '/Customer/PayBill/' + renderdata?.Gala}
            viewBox={`0 0 256 256`}
          />
          <p>Pay your Bill</p>
          <div className="estate-details">
            <div className="estate-code">Estate Code: {renderdata?.Gala}</div>
            <div className="ward">{renderdata?.uniqueness}</div>
          </div>

          <div style={{ border: '1px black solid', padding: '5px', backgroundColor: '#fde8e9' }}>
            <div className="innerheader" >
              <div style={{ color: '#f82228' }}>Bill number: {renderdata?.BillNumber}</div>
              <div>FromDate: {renderdata?.FromDate}</div>
            </div>
            <div className="innerheader" >
              <div>Permit Type: {renderdata?.PermitType}</div>
              <div>To date: {renderdata?.ToDate}</div>
            </div>
            <div className="innerheader" >
              {/* <div className="assessment-title">impressive Date : / / </div> */}
              {/* <div className="impressive-date">Assessment: {renderdata?.Amount}</div> */}
            </div>
          </div>

          <div style={{ border: '1px black solid', padding: '5px', backgroundColor: '#e9f8f1' }}>
            <div className="innerheader" >
              <div>Address: {renderdata?.Address}</div>
              <div>Mobile No :{renderdata?.ContactNumber}</div>
            </div>
            <div className="innerheader" >
              <div>FullName :{renderdata?.FullName}</div>
              <div>Locality: {renderdata?.Locality}</div>
            </div>
          </div>



          <div style={{ border: '1px black solid' }}>
            <div className="tax-details-title" style={{ textAlign: 'center' }}>Details of Taxes</div>
            <div className="tax-table" style={{ display: 'grid', justifyContent: 'center', width: '100%' }}>
              <table className="table table-striped tax-table-data" style={{ width: '48vw' }}>
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
                      <b>Due Amount</b>
                    </td>
                    <td align="center" style={{ width: '25%' }}>
                      <span id="lbl_genTax2">{dueamounntdata}</span>
                    </td>
                  </tr>
                  {/* <tr className="table-danger">
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
                      <span id="lbl_genTax2">-{renderdata?.Discount}</span>
                    </td>
                  </tr> */}
                  <tr>
                    <td style={{ width: '25%', textAlign: 'center' }}>
                      <b>Current Bill Amount</b>
                    </td>
                    <td align="center" style={{ width: '25%' }}>
                      <span id="lbl_genTax2">{currentbillamount}</span>
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
          <div className="estate-details d-flex row mx-1 my-4 fw-bold">
            <div className="estate-code">Account Name : ADHISHASHI ADHIKARI NAGAR PALIKA PARISHAD </div>
            <div className="estate-code">Account NO : 6136284508 </div>
            <div className="estate-code">IFSC Code : IDIB000B125 </div>

          </div>

          <div>
            <div className="text-danger my-8 mx-4 fw-bold" >
            नोट- उपरोक्त धनराशि बिल प्राप्ति के 15 दिवस के अन्दर नगर पालिका कोष में जमा न करने की दशा में आवण्टी के विरुद्व, नगर पालिका अधिनियम 1916 की सुसंगत धाराओं के अन्तर्गत कार्यवाही की जायेगी।
            </div>

          </div>

        </div>

      </div>




    </>
  );
};

export default ViewBill;
