"use client";
import React, { useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Admin } from "../../../AdminContext/AdminManageMent";
import Pagination from "@/Components/pagination";
// import { format } from "date-fns";
import { CSVLink } from 'react-csv'
import { usePDF } from 'react-to-pdf';
import { backend } from '../../../paths'
import * as XLSX from 'xlsx';
// import "./custlist.css"

const Page = () => {
  const navigate = useRouter();
  const { GetDocumentForm, NoticeofdemandReports, GetNotice } =
    useContext(Admin);
  const pendingRef = useRef(null);
  const [Helper, SetHelper] = useState([]);
  const [Customer, SetCustomer] = useState([]);
  const [locality, setLocality] = useState(null);
  const [s, sets] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [formdata, setFormData] = useState({
    Zone: "",
    Ward: "",
    Mohalla: "",
    Meter: "",
    FromDate: "",
    ToDate: "",
  });
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [Meter, SetMeter] = useState([]);
  const [Mohalla, setselectedMohalla] = useState("");
  const [fromDate, setselectedFromdate] = useState("");
  const [Todate, setselectedTodate] = useState("");
  const [DataNotice, setDataNotice] = useState("");
  const [CSVDATA, SetCSVDATA] = useState([]);
  useEffect(() => {
    Getdata();
    sets(Math.random());
  }, [locality]);

  async function FetchReciept(data) {
    navigate.push('../Notice/' + data.Gala)
  }


  async function Getdata() {
    let helper = await GetDocumentForm();
    SetHelper(helper?.locality);
    SetMeter(helper?.meter);
  }
  async function SubmitLocality(e) {
    e.preventDefault();
    console.log(formdata);
    SetCustomer([]);
    // setRenderData(false)
    const datalocality = await NoticeofdemandReports(formdata);
    SetCustomer(datalocality);
    // setRenderData(datalocality);
  }

  function cards(data, isPending) {
    setDataNotice()
    const date1 =data?.ToDate.split('T')[0] || permitdata?.ToDate?.split('T')[0]

    // const date1 = format(data?.ToDate, "dd-MM-yyyy");
    return (
      <tr className="table-primary" key={data?.PropertyID}>
        {/* {isPending && (
          <td>
            <input
              type="checkbox"
              checked={selectedCustomers.includes(data)}
              onChange={() => handleCheckboxChange(data)}
            />
          </td>
        )} */}
        <td>{data?.Gala}</td>
        <td>{data?.FullName}</td>
        <td>{data?.Ward}</td>
        <td>{data?.FromDate}</td>
        <td>{date1}</td>
        <td>{data?.ContactNumber}</td>
        <td>{data?.PropertyTax}</td>
        <td>{data?.WaterTax}</td>
        <td>{data?.Remaining}</td>
        <td
          style={{
            display: "flex",
            flexDirection: "row",
            justifyItems: "space-between",
          }}
        >
          <button
            className="btn "
            style={{
              backgroundColor: "#f1772e",
              width: "4rem",
              margin: "6px",
              color: "white",
            }}
            onClick={(e) => {
              FetchReciept(data)
            }}
          >
            View
          </button>
          {/* <button
            className="btn "
            style={{ backgroundColor: "#f1772e", width: "4rem", margin: "6px" }}
          >
            Print
          </button> */}
        </td>
      </tr>
    );
  }

  function handleDownloadPDF(refId) {
    const allTables = document.querySelectorAll(".printableTable"); // Get all tables
    const tableToPrint = document.getElementById(refId); // Get the table to print

    // Hide all other tables
    allTables.forEach((table) => {
      if (table !== tableToPrint) {
        table.style.display = "none";
      }
    });

    window.print(); // Trigger the print dialog

    // Restore the visibility of all tables
    allTables.forEach((table) => {
      table.style.display = "table"; // Reset the display style
    });
  }

  // function handleCheckboxChange(customer) {
  //   setSelectedCustomers((prevState) =>
  //     prevState.includes(customer)
  //       ? prevState.filter((c) => c !== customer)
  //       : [...prevState, customer]
  //   );
  // }

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.id]: e.target.value, // Use e.target.id to correctly identify the form field
    });
    if (e.target.id === "Zone") {
      setSelectedZone(e.target.value);
    }
    if (e.target.id === "Ward") {
      setSelectedWard(e.target.value);
    }
    if (e.target.id === "Mohalla") {
      setselectedMohalla(e.target.value);
    }
    if (e.target.id === "FromDate") {
      setselectedFromdate(e.target.value);
    }
    if (e.target.id === "ToDate") {
      setselectedTodate(e.target.value);
    }
  };

  const uniqueZones = Array.from(new Set(Helper.map((e) => e.Zone)));
  const filteredWards = Helper.filter((e) => e.Zone === selectedZone);
  const uniqueWards = Array.from(new Set(filteredWards.map((e) => e.Ward)));
  const filteredMohallas = Helper.filter((e) => e.Ward === selectedWard);
  const uniquMohallas = Array.from(
    new Set(filteredMohallas.map((e) => e.locality))
  );
  function onSavefile() {
    if (Customer.length > 0) {
      // First Sheet Data
      const headers = ["Srno", "Consumer No", "Property Type", "PMC Number", "Plot No", "Total ARV", "AVR effective From", "Zone", "Ward", "Mohalla", "Customer Name", "Mobile Number", "Plot Area", "Road Width", "Property Tax", "Water Tax", "Property Age", "Electricity Connection", "Water Connection", "Due Ammount", "Sewer Connection", "Location"];
      const uniqueData = new Map();
      Customer.forEach(item => {
        if (!uniqueData.has(item.PropertyID)) {
          uniqueData.set(item.PropertyID, item);
        }
      });
      const CSVDATA = Array.from(uniqueData.values()).map(item => [
        item.Srno,
        item.PropertyID,
        item.PropertyType,
        item.PMCNumber,
        item.Plot_No,
        item.TotalArv,
        item.createdOn,
        item.Zone,
        item.Ward,
        item.Mohalla,
        item.FullName,
        item.ContactNumber,
        item.TotalArea,
        item.Meter,
        item.PropertyTax,
        item.WaterTax,
        item.PropertyAge,
        item.ElectricityConnection,
        item.WaterConnection, item.Remaining,
        item.SewerConnection,
        item.location,
      ]);
      const finalcsv = [headers, ...CSVDATA];
      SetCSVDATA(finalcsv)
      // Second Sheet Data (for example purposes)
      // const secondSheetHeaders = ["Consumer Number", "Floor", "Floor Useas", "Construction type", "Carpet / builtup Area", "ARV"];
      // const secondSheetData = renderdata.map(item => [
      //     item.CustomerID,
      //     item.Floor,
      //     item.PropertyforUse,
      //     item.ConstructionType,
      //     item.sqft,
      //     item.Arv,
      // ]);

      // Create a new workbook
      const wb = XLSX.utils.book_new();

      // Convert the first sheet data to a worksheet
      const ws1 = XLSX.utils.aoa_to_sheet(finalcsv);
      XLSX.utils.book_append_sheet(wb, ws1, "Property Details");

      // Convert the second sheet data to a worksheet
      const ws2 = XLSX.utils.aoa_to_sheet([secondSheetHeaders, ...secondSheetData]);
      XLSX.utils.book_append_sheet(wb, ws2, "Floor Details");

      // Export the file
      XLSX.writeFile(wb, 'CustomerReports.xlsx');
    }
  }

  return (
    <>
      <h4 style={{ padding: "20px" }}>Notice of Demand</h4>
      <div style={{ display: "grid", width: "80vw" }}>
        <form
          onSubmit={SubmitLocality}
          style={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
            padding: "3%",
            borderRadius: "20px",
            backgroundColor: "#f2f4f7",
            marginTop: "10px",
          }}
        >
          {/* <div className="mx-2" style={{ width: "45%", padding: "8px" }}>
            <label style={{ fontWeight: "bold" }}>Zone</label>
            <br />
            <select
              className="form-select mt-2"
              id="Zone"
              onChange={handleChange}
            >
              <option disabled selected>
                Select Zone
              </option>
              {uniqueZones &&
                uniqueZones.map((e) => (
                  <option className="form-control" key={e} value={e}>
                    {e}
                  </option>
                ))}
            </select>
          </div>
          <div className="mx-2" style={{ width: "45%", padding: "8px" }}>
            <label style={{ fontWeight: "bold" }}>Ward</label>
            <br />
            <select
              className="form-select mt-2"
              id="Ward"
              onChange={handleChange}
            >
              <option disabled selected>
                Select Ward
              </option>
              {uniqueWards &&
                uniqueWards.map((e) => (
                  <option className="form-control" key={e} value={e}>
                    {e}
                  </option>
                ))}
            </select>
          </div> */}
          {/* <div className="mx-2" style={{ width: "45%", padding: "8px" }}>
            <label style={{ fontWeight: "bold" }}>Mohalla</label>
            <br />
            <select
              className="form-select mt-2"
              id="Mohalla"
              onChange={handleChange}
            >
              <option disabled selected>
                Select Mohalla
              </option>
              {uniquMohallas &&
                uniquMohallas.map((e) => (
                  <option className="form-control" key={e} value={e}>
                    {e}
                  </option>
                ))}
            </select>
          </div> */}
          {/* <div className="mx-2" style={{ width: "45%", padding: "8px" }}>
            <label style={{ fontWeight: "bold" }}>Road Width</label>
            <br />
            <select
              className="form-select mt-2"
              id="Meter"
              onChange={handleChange}
              required
            >
              <option disabled selected>
                Select Road Width
              </option>
              {Meter &&
                Meter.map((e) => (
                  <option
                    className="form-control mt-2"
                    key={e.Meter}
                    value={e.Meter}
                  >
                    {e.Meter}
                  </option>
                ))}
            </select>
          </div> */}
          <div className="mx-2" style={{ width: "45%", padding: "8px" }}>
            <strong>From Date</strong>
            <span id="lbl_financialyear">
              <input
                autoComplete="off"
                type="date"
                id="FromDate"
                onChange={handleChange}
                className="form-control"
                value={fromDate}
              ></input>
            </span>
          </div>
          <div className="mx-2" style={{ width: "45%", padding: "8px" }}>
            <strong>To Date</strong>
            <span id="lbl_financialyear">
              <input
                autoComplete="off"
                type="date"
                id="ToDate"
                onChange={handleChange}
                className="form-control"
                value={Todate}
              ></input>
            </span>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <button
              type="submit"
              className="btn btn-dark mx-4 mt-3"
              style={{ width: "20vw" }}
            >
              Get Customers
            </button>
          </div>
        </form>

        <div className="table-responsive m-3" style={{ width: "78vw" }}>
          {/* <div style={{ display: 'flex', width: '100%', flexWrap: "wrap", padding: '3%', borderRadius: '20px', backgroundColor: '#f2f4f7', marginTop: '10px', overflowX: 'auto' }}> */}
            {
              Customer.length > 0 &&
              <>
                <CSVLink data={CSVDATA} target="blank" onClick={onSavefile} className='my-3 btn btn-primary' style={{ width: '20vw' }}> Download Excel</CSVLink>

                {/* <button className="my-3 mx-2 btn btn-primary" onClick={() => handleDownloadPDF('printableTable')}>Download PDF</button> */}
              </>
            }
          {/* </div> */}
          <h3>Customers List of Demand Notice</h3>
          {/* <input type='search' placeholder='Search Owners here' className='form-control mx-5 my-3' style={{ width: '50vw', textAlign: 'center', background: '#f2f4f7' }} onChange={(e) => SearchCustomer(e)} /> */}
          <div>
            <table
              id="printableTable"
              className="table table-striped table-hover table-bordered table-primary align-middle mt-2 printableTable"
              ref={pendingRef}
            >
              <thead className="table-light">
                <tr>
                  {/* <th>Checkboxes</th> */}
                  <th>Demand No</th>
                  <th>Owner Name</th>
                  <th>Ward</th>
                  <th>From date</th>
                  <th>To date</th>
                  <th>ContactNumber</th>
                  <th>Property Tax</th>
                  <th>Water Tax</th>
                  <th>Remaining due</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(Customer) && Customer.length > 0 ? (
                  <Pagination
                    data={Customer}
                    perPageItems={15}
                    func={(c) => cards(c, true)}
                    searchparam={["PropertyID", "FullName", "ContactNumber"]}
                    searchword={s}
                    useeffectactive={locality}
                  />
                ) : (
                  <tr>
                    <td colSpan="14">No pending customer data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
