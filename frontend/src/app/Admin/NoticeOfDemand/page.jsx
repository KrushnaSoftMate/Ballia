'use client'
import React, { useContext, useState, useEffect, useRef } from 'react'
import { Admin } from '../../../app/AdminContext/AdminManageMent'
import Pagination from '@/Components/pagination'
import { CSVLink } from 'react-csv'
import { backend } from '../../../app/paths'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
// import "./custlist.css"


const Page = () => {
  const { GetCustomerList, GetDocumentForm, ApproveBulkApplication } = useContext(Admin)
  const [Helper, SetHelper] = useState([]);
  const [Customer, SetCustomer] = useState([]);
  const [locality, setLocality] = useState(null)
  const [CSVDATA, SetCSVDATA] = useState([])
  const [CSVDATA1, SetCSVDATA1] = useState([])
  const [s, sets] = useState(false)
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const approvedRef = useRef(null);
  const pendingRef = useRef(null);
  const [formdata, setFormData] = useState({})
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [selectedMohalla, setselectedMohalla] = useState('');
  const [Meter, SetMeter] = useState([])
  const [searchCustomer, SetSearchCustomer] = useState([])

  useEffect(() => {
    Getdata()
    sets(Math.random())
  }, [locality])

  async function Getdata() {
    let helper = await GetDocumentForm()
    SetHelper(helper?.locality)
    SetMeter(helper?.meter)

  }

  async function SubmitLocality(e) {
    e.preventDefault();
    console.log(formdata);
    SetCustomer([]);
    let datalocality = await GetCustomerList(formdata)
    SetCustomer(datalocality);
    SetSearchCustomer(datalocality);
  }

  function cards(data, isPending) {
    return (
      <tr className="table-primary" key={data?.PropertyID}>
        {isPending && (
          <td>
            <input
              type="checkbox"
              checked={selectedCustomers.includes(data)}
              onChange={() => handleCheckboxChange(data)}
            />
          </td>
        )}
        <td>{data?.PropertyID}</td>
        <td>{data?.FullName}</td>
        {/* <td>{data?.FatherorGaurdianName}</td> */}
        {/* <td>{data?.TotalArea}</td>
        <td>{data?.location}</td> */}
        <td>{data?.Ward}</td>
        <td>{data?.Zone}</td>
        {/* <td>{data?.Meter}</td> */}
        <td>{data?.Mohalla}</td>
        <td>{data?.ContactNumber}</td>
        <td>{data?.TotalArv}</td>
        <td>{data?.Approvance}</td>
        <td>
          {data?.documents.map((x, i) => (
            <img key={i} style={{ borderRadius: '20px', width: '80px', marginBottom: '1rem' }} src={backend + "/CustomerDocuments/" + x} />
          ))}
        </td>
      </tr>
    )
  }


  function handleDownloadPDF(refId) {
    const allTables = document.querySelectorAll('.printableTable'); // Get all tables
    const tableToPrint = document.getElementById(refId); // Get the table to print

    // Hide all other tables
    allTables.forEach((table) => {
      if (table !== tableToPrint) {
        table.style.display = 'none';
      }
    });

    window.print(); // Trigger the print dialog

    // Restore the visibility of all tables
    allTables.forEach((table) => {
      table.style.display = 'table'; // Reset the display style
    });
  }

  function onSavefile() {
    if (pendingCustomers.length > 0) {
      const headers = Object.keys(pendingCustomers[0]);
      const csvData = pendingCustomers.map(item => headers.map(key => item[key]));
      const finalcsv = [headers, ...csvData];
      SetCSVDATA(finalcsv);
    }
  }
  function onSavefile1() {
    if (ApprovedCustomers.length > 0) {
      const headers = Object.keys(ApprovedCustomers[0]);
      const csvData = ApprovedCustomers.map(item => headers.map(key => item[key]));
      const finalcsv = [headers, ...csvData];
      SetCSVDATA1(finalcsv);
    }
  }

  function handleCheckboxChange(customer) {
    setSelectedCustomers(prevState =>
      prevState.includes(customer)
        ? prevState.filter(c => c !== customer)
        : [...prevState, customer]
    );
  }

  async function handleApprove() {
    for (const customer of selectedCustomers) {
      await ApproveBulkApplication(customer.PropertyID, "Approved");
    }
    SubmitLocality(locality);  // refresh the list after approval
    setSelectedCustomers([]);
  }

  const pendingCustomers = Array.isArray(Customer) ? Customer.filter(c => c.Approvance === 'Pending') : [];
  const ApprovedCustomers = Array.isArray(Customer) ? Customer.filter(c => c.Approvance === 'Approved') : [];

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.id]: e.target.value,  // Use e.target.id to correctly identify the form field
    });
    if (e.target.id === 'Zone') {
      setSelectedZone(e.target.value);
    }
    if (e.target.id === 'Ward') {
      setSelectedWard(e.target.value);
    }
    if (e.target.id === 'Mohalla') {
      setselectedMohalla(e.target.value);
    }
  };

  const uniqueZones = Array.from(new Set(Helper.map(e => e.Zone)));
  const filteredWards = Helper.filter(e => e.Zone === selectedZone);
  const uniqueWards = Array.from(new Set(filteredWards.map(e => e.Ward)));
  const filteredMohallas = Helper.filter(e => e.Ward === selectedWard);
  const uniquMohallas = Array.from(new Set(filteredMohallas.map(e => e.locality)));

  const SearchCustomer = (e) => {
    let searchValue = e.target.value.toLowerCase();
    if (!searchValue) {
      SetSearchCustomer(Customer);
      return;
    }
    let newData = Customer.filter((item) => {
      return (
        item.PropertyID.toLowerCase().includes(searchValue) ||
        item.FullName.toLowerCase().includes(searchValue) ||
        item.ContactNumber.toLowerCase().includes(searchValue)
      )
    });
    SetSearchCustomer(newData);
  };

  return (
    <>
     <h4 style={{ padding:"20px" }}>Notice of Demand</h4  >
      <div style={{ display: "grid", width: "80vw" }}>
        <form onSubmit={SubmitLocality} style={{ display: 'flex', width: '100%', flexWrap: "wrap", padding: '3%', borderRadius: '20px', backgroundColor: '#f2f4f7', marginTop: '10px' }}>
          <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
            <label style={{ fontWeight: 'bold' }}>Zone</label><br />
            <select className="form-select mt-2" id="Zone" onChange={handleChange}>
              <option disabled selected>Select Zone</option>
              {uniqueZones && uniqueZones.map((e) => (
                <option className="form-control" key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>
          <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
            <label style={{ fontWeight: 'bold' }}>Ward</label><br />
            <select className="form-select mt-2" id="Ward" onChange={handleChange}>
              <option disabled selected>Select Ward</option>
              {uniqueWards && uniqueWards.map((e) => (
                <option className="form-control" key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>
          <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
            <label style={{ fontWeight: 'bold' }}>Mohalla</label><br />
            <select className="form-select mt-2" id="Mohalla" onChange={handleChange}>
              <option disabled selected>Select Mohalla</option>
              {uniquMohallas && uniquMohallas.map((e) => (
                <option className="form-control" key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>
          <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
            <label style={{ fontWeight: 'bold' }}>Road Width</label><br />
            <select className="form-select mt-2" id="Meter" onChange={handleChange} required>
              <option disabled selected>Select Road Width</option>
              {Meter && Meter.map((e) => (
                <option className="form-control mt-2" key={e.Meter} value={e.Meter}>{e.Meter}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <button type='submit' className='btn btn-dark mx-4 mt-3' style={{ width: '20vw' }} >Get Customers</button>
          </div>
        </form>


        <div className="table-responsive m-3" style={{ width: "78vw" }}>
          <h3>Pending Customers</h3>
          {/* <input type='search' placeholder='Search Owners here' className='form-control mx-5 my-3' style={{ width: '50vw', textAlign: 'center', background: '#f2f4f7' }} onChange={(e) => SearchCustomer(e)} /> */}
          <div >
            <table id="printableTable" className="table table-striped table-hover table-bordered table-primary align-middle mt-2 printableTable" ref={pendingRef}>
              <thead className="table-light">
                <tr>
                  <th>Checkboxes</th>
                  <th>Consumer No</th>
                  <th>Owner Name</th>
                  {/* <th>Father/Guardian Name</th>
                <th>TotalArea</th>
                <th>location</th> */}
                  <th>Ward</th>
                  <th>Zone</th>
                  {/* <th>Meter</th> */}
                  <th>Mohalla</th>
                  <th>ContactNumber</th>
                  <th>Total ARV</th>
                  <th>Approvance</th>
                  <th>Document Photos</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(pendingCustomers) && pendingCustomers.length > 0 ? (

                  <Pagination data={pendingCustomers} perPageItems={15} func={c => cards(c, true)} searchparam={["PropertyID", "FullName", "ContactNumber"]} searchword={s} useeffectactive={locality} />
                ) : (
                  <tr>
                    <td colSpan="14">No pending customer data available</td>
                  </tr>
                )}
                
              </tbody>
            </table>
          </div>

         
        </div>

         {Array.isArray(pendingCustomers) && pendingCustomers.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>
              <button onClick={() => handleDownloadPDF('printableTable')} className='btn btn-success my-3'>Download Pending Customers PDF</button>
            </div>
            <div>
              <CSVLink data={CSVDATA} target="blank" onClick={onSavefile} className='my-3 btn btn-primary' style={{ margin: "20px", width: '20vw' }}> Download Excel</CSVLink>
            </div>
          </div>
        )} 
      </div>
    </>
  )
}

export default Page
