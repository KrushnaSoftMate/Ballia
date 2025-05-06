"use client";
import { Customer } from "@/app/AdminContext/CustomerManagement";
import Link from "next/link";
import React, { useState, useContext, useEffect, Suspense } from "react";
import "./bill.css";
import { usePDF } from "react-to-pdf";
import QRCode from "react-qr-code";
import { frontend } from "@/app/paths";

const ViewBill = (props) => {
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const statecalls = useContext(Customer);
  const { ViewBills } = statecalls;
  const [renderdata, setRenderData] = useState([]);
  const [BillRender, setBillRender] = useState([]);
  const [billdata, setBillData] = useState({});
  const [interestdata, setInterestdata] = useState(0);
  const [dueamounntdata, setDueamounntData] = useState(0);

  const viewBill = async (e) => {
    e.preventDefault();
    if (billdata.BillNumber) {
      const data = await ViewBills(billdata.BillNumber);
      if (data.customer.length > 0 || data.BillBreakdown.length > 0) {
        let dueamounnt = Math.ceil(data?.customer[0]?.DueAmount / 1.1);
        setDueamounntData(dueamounnt);
        let interest = Math.ceil(data?.customer[0]?.DueAmount - dueamounnt);
        setInterestdata(interest);
        console.log(interest);
        console.log(dueamounnt);
        setRenderData(data?.customer[0]);
        setBillRender(data?.BillBreakdown);
      } else {
        alert("Please Enter Correct Consumer Number");
        setRenderData([]);
        setBillRender([]);
      }
    } else {
      alert("Please Enter Consumer Number");
      setRenderData([]);
      setBillRender([]);
    }
  };

  return (
    <>
      <div
        style={{
          height: "48vh",
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "url(/Property-Banner.png)",
          backgroundSize: "cover",
        }}
      >
        <form onSubmit={viewBill} style={{ height: "13vh", display: "grid" }}>
          <h3
            style={{
              color: "white",
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            Municipal Corporation
          </h3>
          <input
            className="form-control"
            type="text"
            id="BillNumber"
            placeholder="Enter Consumer Number Here"
            onChange={(e) =>
              setBillData({ ...billdata, [e.currentTarget.id]: e.target.value })
            }
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <button
              style={{ backgroundColor: "#ec931f", color: "white" }}
              className="my-2 mx-2 btn"
            >
              View Bill
            </button>
            <button
              style={{
                backgroundColor: "tranparent",
                color: "white",
                border: "1px solid white",
              }}
              className="my-2 mx-2 btn"
              onClick={toPDF}
              hidden={renderdata?.PropertyID === undefined ? true : false}
            >
              Print Bill
            </button>
          </div>
        </form>
      </div>
      <div
        hidden={renderdata?.PropertyID === undefined ? true : false}
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#e9f8f1",
        }}
      >
        <div className="bill-container" ref={targetRef}>
          <div className="bill-header">
            {/* <div>
              <img src="https://cdnbbsr.s3waas.gov.in/s3cd4bb35c75ba84b4f39e547b1416fd35/uploads/2021/06/2021062689-300x300.jpg" width="100px" alt="" />
            </div> */}
            <div style={{ color: "red" }} className="municipal-council">
              <h2>MUNICIPAL CORPORATION</h2>
            </div>
            <div className="form">Form 17</div>
            <div className="bill-title">
              Bill (House Tax/Water Tax/Drainage Tax)
            </div>
            <div className="financial-year">Financial year 2023-2024</div>
          </div>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "10%", width: "10%" }}
            value={frontend + "/Customer/PayBill/" + renderdata?.PropertyID}
            href={frontend + "/Customer/PayBill/" + renderdata?.PropertyID}
            viewBox={`0 0 256 256`}
          />
          <p>Pay your Bill</p>
          <div className="estate-details">
            <div className="estate-code">
              Estate Code: {renderdata?.PropertyID}
            </div>
            <div className="ward">{renderdata?.uniqueness}</div>
          </div>

          <div
            style={{
              border: "1px black solid",
              padding: "5px",
              backgroundColor: "#fde8e9",
            }}
          >
            <div className="innerheader">
              <div style={{ color: "#f82228" }}>
                Bill number: {renderdata?.BillNumber}
              </div>
              <div>House number: {renderdata?.Plot_No}</div>
            </div>
            <div className="innerheader">
              <div>Bill date: {renderdata?.ToDate}</div>
              <div>Property Type: {renderdata?.PropertyType}</div>
            </div>
            <div className="innerheader">
              <div className="assessment-title">impressive Date : / / </div>
              <div className="impressive-date">
                Assessment: {renderdata?.Amount}
              </div>
            </div>
          </div>

          <div
            style={{
              border: "1px black solid",
              padding: "5px",
              backgroundColor: "#e9f8f1",
            }}
          >
            <div className="innerheader">
              <div>Address: {renderdata?.Address}</div>
              <div>Mobile No :</div>
            </div>
            <div className="innerheader">
              <div>FullName :</div>
              <div>{renderdata?.uniqueness}</div>
            </div>
          </div>
          <div style={{ border: "1px black solid" }}>
            <div className="tax-details-title" style={{ textAlign: "center" }}>
              Details of Taxes
            </div>
            <div
              className="tax-table"
              style={{
                display: "grid",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <table
                className="table table-striped tax-table-data"
                style={{ width: "46.9vw" }}
              >
                <thead className="table-dark">
                  <tr>
                    <th>Tax</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <Suspense>
                    {BillRender &&
                      BillRender.map((xe) => {
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
                        );
                      })}
                  </Suspense>
                  <tr className="table-danger">
                    <td style={{ width: "25%", textAlign: "center" }}>
                      <b>Due Amount</b>
                    </td>
                    <td align="center" style={{ width: "25%" }}>
                      <span id="lbl_genTax2">{dueamounntdata}</span>
                    </td>
                  </tr>
                  <tr className="table-danger">
                    <td style={{ width: "25%", textAlign: "center" }}>
                      <b>Interest</b>
                    </td>
                    <td align="center" style={{ width: "25%" }}>
                      <span id="lbl_genTax2">{interestdata}</span>
                    </td>
                  </tr>
                  <tr className="table-danger">
                    <td style={{ width: "25%", textAlign: "center" }}>
                      <b>Discount</b>
                    </td>
                    <td align="center" style={{ width: "25%" }}>
                      <span id="lbl_genTax2">-{renderdata?.Discount}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "25%", textAlign: "center" }}>
                      <b>Paid Amount</b>
                    </td>
                    <td align="center" style={{ width: "25%" }}>
                      <span id="lbl_genTax2">{renderdata?.PaidAmount}</span>
                    </td>
                  </tr>
                  <tr className="table-success">
                    <td style={{ width: "25%", textAlign: "center" }}>
                      <b>Total Payable</b>
                    </td>
                    <td align="center" style={{ width: "25%" }}>
                      <span id="lbl_genTax2">{renderdata?.Remaining}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div className="note">
              1. The amount of this bill should be paid within 15 days of
              presentation of the bill, otherwise a notice of demand will be
              issued and if necessary, warrants for confiscation and attachment
              will also be issued.
            </div>
            <div className="note">
              2. The property tax of the building is based on the data obtained
              in the survey. Whose details are available in the computer room of
              the Municipal Corporation, if there is any objection then
              objection can be made within one month.
            </div>
            <div className="note">
              3. A computerized receipt can be obtained by depositing money in
              the computer room of the Municipal Council.
            </div>
            <div className="update-date">Update Date: 28/02/2024</div>
            <div className="update-by">Update By: ADMIN</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBill;
