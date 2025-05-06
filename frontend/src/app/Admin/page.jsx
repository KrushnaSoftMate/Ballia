'use client'
import React, { useContext, useEffect, useState } from 'react';
import { Admin } from '../AdminContext/AdminManageMent'
import { Chart } from "react-google-charts";
import "./TableStyles.css";
import { usePDF } from "react-to-pdf";
const page = () => {
  const statecalls = useContext(Admin);
  const { GetDocumentForm } = statecalls;
  const { DashboardReports, DashboardChart } = useContext(Admin);
  const [Report, SetReport] = useState({})
  const [localityData, SetLocalityData] = useState([]); // New state to hold data for multiple localities
  const [Locality, SetLocality] = useState([])
  const [chartdata, SetChartData] = useState([])
  const [selectedZone, setSelectedZone] = useState('');
  const [SelectedLocality, SetSelectedLocality] = useState("");
  const { toPDF, targetRef } = usePDF({
    filename: "DemandAndCollectionReport.pdf",
  });

  useEffect(() => {
    GetData()
    GetForm()

  }, [])

  async function GetData() {
    let data = await DashboardReports()
    SetReport(data[0]);
    SetChartData(data[0]);
  }

  async function GetChart(locality) {
    SetSelectedLocality(locality);
    let data1 = await DashboardChart(locality);
    SetSelectedReport(data1[0]);
    SetChartData(data1[0]);
    SetLocalityData((prevData) => [
      ...prevData,
      { locality, data: data1[0] }, // Store both locality and the related data
    ]);
  }

  async function GetForm() {
    let data = await GetDocumentForm();

    SetLocality(data.locality)
  }

  const data = [
    ["Amount", "Total Due Amount", "Total Paid Amount", "Total Billing Amount"],
    [
      "Amount",
      chartdata?.total_due_amount,
      chartdata?.PaidAmount,
      chartdata?.total_Billing,
    ],
  ];

  const data1 = [
    ["Amount", "Total Due Amount", "Total Paid Amount", "Total Billing Amount"],
    [
      "Amount",
      Report?.total_due_amount,
      Report?.PaidAmount,
      Report?.total_Billing,
    ],
  ];

  const options = {
    chart: {
      title: "Customers",
      subtitle: "Till Date:" + Date(),
    },
  };

  const uniqueZones = Array.from(new Set(Locality.map(e => e.Zone)));
  const filteredWards = Locality.filter(e => e.Zone === selectedZone);
  const uniqueWards = Array.from(new Set(filteredWards.map(e => e.Ward)));

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyItems: "center", backgroundColor: "#f2f4f7",
        }}
      >
        <div style={{ margin: "0px 90px" }}>
          <h3 style={{ textAlign: "left" }}>Dashboard</h3>
          <div className="row row-cols-1 row-cols-md-3 g-3">
            <div className="col">
              <div
                className="card my-2"
                style={{
                  width: "20rem",
                  background: "linear-gradient(to right,#fdd722, #fd7a14)",
                  borderRadius: "18px",
                  boxShadow: "5px 10px #c7c3c3",
                }}
              >
                <div className="card-body">
                  <h6 className="card-title text-white">Total Due</h6>
                  <hr></hr>
                  <div className="d-flex">
                    <img src="/Total-Due.png" style={{ width: "60px", marginRight: "50px" }}></img>
                    <h4 className="card-text" style={{ color: "white" }}>
                      ₹{" "}
                      {Report?.total_due_amount === null
                        ? 0
                        : Report?.total_due_amount}{" "}
                      Rs
                      <span></span>
                      <p className="text-end fs-5">Total Amount</p>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div
                className="card my-2"
                style={{
                  width: "20rem",
                  background: "linear-gradient(to right,#5aba72,#009245)",
                  borderRadius: "18px",
                  boxShadow: "5px 10px #c7c3c3",
                }}
              >
                <div className="card-body">
                  <h6 className="card-title text-white">Total Bill Paid</h6>
                  <hr></hr>
                  <div className="d-flex">
                    <img src="/Total-Bill-Paid.png" style={{ width: "60px", marginRight: "50px" }}></img>
                    <h4 className="card-text" style={{ color: "white" }}>
                      ₹ {Report?.PaidAmount === null ? 0 : Report?.PaidAmount} Rs
                      <span></span>
                      <p className="text-end fs-5">Total Amount</p>
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div
                className="card my-2"
                style={{
                  width: "20rem",
                  background: "linear-gradient(to right,#4db9e9, #4285f4)",
                  borderRadius: "18px",
                  boxShadow: "5px 10px #c7c3c3",
                }}
              >
                <div className="card-body">
                  <h6 className="card-title text-white">Total Billing</h6>
                  <hr></hr>
                  <div className="d-flex">
                    <img src="/Total-Billing.png" style={{ width: "60px", marginRight: "50px" }}></img>
                    <h4 className="card-text" style={{ color: "white" }}>
                      ₹{" "}
                      {Report?.total_Billing === null ? 0 : Report?.total_Billing}{" "}
                      Rs
                      <span></span>
                      <p className="text-end fs-5">Total Amount</p>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "white",
              margin: "16px",
              padding: "8px",
              borderRadius: "18px",
              boxShadow: "8px 10px #c7c3c3",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-around", width: "45%", margin: "auto", }}>
              <div>
                <select
                  className="form-select"
                  name="locality"
                  onChange={(e) => {
                    GetChart(e.target.value);
                  }}
                >
                  <option disabled selected>
                    Select Ward
                  </option>
                  {Locality &&
                    Locality.map((e, i) => (
                      <option className="form-control" style={{textTransform:"capitalize"}} value={e.uniqueness}>
                        {e.uniqueness}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <Chart
              chartType="Bar"
              width="60vw"
              height="400px"
              data={Locality ? data : data1}
              options={options}
            />
          </div>
        </div>
      </div>
      {localityData.length > 0 && (
        <button className="my-2 mx-2 btn btn-primary" onClick={toPDF}>
          Print Report
        </button>
      )}
      <div className="table-container table-responsive">
        <table className="tax-table table table-bordered border-dark" ref={targetRef}>
          <thead className="table-primary">
            <tr>
              <th rowSpan="2" >Ward No</th>
              <th colSpan="2">No. of Houses</th>
              <th colSpan="6">Property Tax Details</th>
            </tr>
            <tr >
              <th >Residential</th>
              <th>Commercial</th>
              <th>Arrears Resi.</th>
              <th>Arrears Comm.</th>
              <th>Current Resi.</th>
              <th>Current Comm.</th>
              <th>Paid Resi.</th>
              <th>Paid Comm.</th>
            </tr>
          </thead>
          <tbody>
            {localityData.length > 0 ? (
              localityData.map((localityRow, index) => (
                <tr key={index}>
                  <td>{localityRow.locality}</td>
                  <td>{localityRow.data.residential_customers || 0}</td>
                  <td>{localityRow.data.commercial_customers || 0}</td>
                  <td>{localityRow.data.residential_due_amount || 0}</td>
                  <td>{localityRow.data.commercial_due_amount || 0}</td>
                  <td>{localityRow.data.residential_total_billing || 0}</td>
                  <td>{localityRow.data.commercial_total_billing || 0}</td>
                  <td>{localityRow.data.residential_paid_amount || 0}</td>
                  <td>{localityRow.commercial_paid_amount || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">Please select a locality to view data.</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">Total Demand</td>
              <td colSpan="7">{Report?.total_due_amount}</td>
            </tr>
            <tr>
              <td colSpan="2">Total Collection</td>
              <td colSpan="7">{Report?.PaidAmount}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );

};


export default page;
