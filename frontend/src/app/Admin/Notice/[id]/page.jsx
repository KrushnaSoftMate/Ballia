"use client";
import Link from "next/link";
import { Admin } from "@/app/AdminContext/AdminManageMent";
import React, { useContext, useEffect, useState } from "react";
import { Customer } from "@/app/AdminContext/CustomerManagement";
import { usePDF } from "react-to-pdf";
// import { format } from "date-fns";
const page = ({ params }) => {
  const statecalls1 = useContext(Admin);
  const { GetCustomerData } = statecalls1;
  const statecalls = useContext(Customer);
  const { GetBillHistory } = statecalls;
  const [renderdata, setRenderData] = useState([]);
  const [renderbilldata, setRenderbillData] = useState([]);
  const { toPDF, targetRef } = usePDF({ filename: "Reciept.pdf" });

  async function Getdata() {
    const data = await GetCustomerData(params.id);
    console.log("data", data);
    setRenderData(data[0]);
  }

  async function getbilldetails() {
    const data1 = await GetBillHistory(params.id);
    console.log("data11", data1[0]);
    setRenderbillData(data1[0]);
  }

  useEffect(() => {
    Getdata();
    getbilldetails();
  }, []);

  // const date3=renderbilldata?.ToDate;
  // const ToDate1 = renderbilldata?.ToDate ;
  // var date2 = renderbilldata?.ToDate.toISOString().split('T')[0];
  return (
    <>
      <div style={{ padding: "20px" }}>
        <div
          ref={targetRef}
          style={{
            border: "2px solid black",
            padding: "2rem",
            display: "grid",
            textAlign: "center",
            fontSize: "22px",
          }}
        >
          <div className="notice">
            <h2>कार्यालय नगर पालिका परिषद बलिया</h2>
            <h3>कर अनुभाग</h3>
            <h4>उत्तर प्रदेश नगर पालिका अधिनियम 1916 की धारा 168 तहत</h4>
            <h4>मांग नोटिस</h4>

            <p style={{ textAlign: "start", marginTop: "2rem" }}>
              आपको यह नोटिस दिया जाता है कि बलिया नगर पालिका परिषद,{" "}
              <strong>आपसे:</strong> {renderdata.FullName}
              <strong> भवन संख्या:</strong> {renderdata.Plot_No}
              <strong> डिमांड नंबर</strong> {params.id}-
              <strong>मोहल्ला </strong>
              {renderdata.Mohalla}
              {""} के मध्यम
              <strong> रु०</strong> {renderbilldata.Remaining} धनराशि की मांग करती
              है। जो <strong>  तारिख</strong>
              {renderbilldata.FromDate} 
              {/* माह__________वर्ष __________  */}
              से प्रारंभ
              होने वाली <strong> और </strong>
              {renderbilldata?.ToDate} अवधि के मध्य, सरकार द्वारा स्वीकृत नियमों
              के अधीन उगाही जाने योग्य है। और इस नोटिस के तामील किए जाने की
              तारीख से 15 दिनों के भीतर उक्त धनराशि का भुगतान नगर पालिका
              कार्यालय में नहि किया जाता है । यदि या इसके लिए कोई पर्याप्त कारण
              प्रस्तुत नहीं किया जाता है, तो व्यय सहित धनराशि की वसूली के लिए
              करस्थम का वारंट जारी किया जाएगा। यह वसूली भू-राजस्व की भांति की
              जाएगी और उत्तर प्रदेश नगर पालिका अधिनियम की धारा 173 (क) के
              अंतर्गत जिलाधिकारी महोदय को संदर्भित कर दिया जाएगा।
            </p>

            <h2 style={{ textAlign: "start" }}>वित्तीय वर्ष 2024-2025</h2>
            <table
              className="table table-bordered"
              style={{ width: "18vw", border: "1px solid black" }}
            >
              <thead>
                <tr>
                  <th>विवरण</th>
                  <th>राशि (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>गृहकर बकाया</td>
                  <td></td>
                </tr>
                <tr>
                  <td>गृहकर चालू</td>
                  <td>{renderdata.PropertyTax}</td>
                </tr>
                <tr>
                  <td>जलकर बकाया</td>
                  <td>{renderdata.WaterTax}</td>
                </tr>
                <tr>
                  <td>जलकर चालू</td>
                  <td></td>
                </tr>
                <tr>
                  <td>N.D. शुल्क</td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <strong>कुल योग</strong>
                  </td>
                  <td>
                    <strong>{""}</strong>
                  </td>
                </tr>
              </tbody>
            </table>

            <p style={{ textAlign: "end" }}>
              <strong style={{ textAlign: "center" }}>कर अधीक्षक/ कर निर्धारण अधिकारी </strong>
              <br></br> नगर पालिका परिषद बलिया
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={toPDF}
            className="btn btn-success form-control my-4 col-4 text-center"
          >
            Print Reciept
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
