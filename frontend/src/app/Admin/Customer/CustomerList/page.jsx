'use client'
import React, { useContext, useState, useEffect, useRef } from 'react'
import { Admin } from '../../../AdminContext/AdminManageMent'
import Pagination from '@/Components/pagination'
import { CSVLink } from 'react-csv'
import "./custlist.css"


const Page = () => {
  const { GetCustomerList, GetDocumentForm, ApproveBulkApplication } = useContext(Admin)
  const [Helper, SetHelper] = useState([]);
  const [Customer, SetCustomer] = useState([]);
  const [locality, setLocality] = useState(null)
  const [CSVDATA, SetCSVDATA] = useState([])
  const [CSVDATA1, SetCSVDATA1] = useState([])
  const [CSVDATA2, SetCSVDATA2] = useState([])
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
  const [Locality, SetLocality] = useState([]);
  const [options, setOptions] = useState("Pending")



  useEffect(() => {
    Getdata()
    // sets(Math.random())
  }, [locality])

  async function Getdata() {
    let helper = await GetDocumentForm()
    console.log("helper", helper);
    SetLocality(helper?.locality)
    SetHelper(helper?.locality)
    SetMeter(helper?.meter)
  }

  async function SubmitLocality(e) {
    e.preventDefault();
    console.log(formdata);
    SetCustomer([]);
    let datalocality = await GetCustomerList(formdata)
    console.log("datalocality", datalocality);
    SetCustomer([...datalocality]);
    console.log(Customer);

    SetSearchCustomer(datalocality);
  }

  function cards(data, isPending) {
    console.log("data", data);

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
        <td>{data?.TotalArea}</td>
        <td>{data?.Area_Use}</td>
        <td>{data?.TotalARV}</td>
        <td>{data?.location}</td>
        <td>{data?.Meter}</td>
        <td>{data?.locality}</td>
        <td>{data?.ContactNumber}</td>
        <td>{data?.documents}</td>
      </tr>

    )
  }


  function handleDownloadPDF(refId) {
    // const allTables = document.querySelectorAll('.printableTable');
    // const tableToPrint = document.getElementById(refId);

    // Hide all other tables
    // allTables.forEach((table) => {
    //   if (table !== tableToPrint) {
    //     table.style.display = 'none';
    //   }
    // });

    // window.print(); // Trigger the print dialog

    // Restore the visibility of all tables
    // allTables.forEach((table) => {
    //   table.style.display = 'table'; // Reset the display style
    // });


    const printContents = document.getElementById(refId)?.outerHTML;
    if (!printContents) return;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 2px;
            }
            table {
              border-collapse: collapse;
              width: 100vw;
            }
            th, td {
              border: 1px solid #000;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
  
            /* Hide the first column (checkbox column) */
            table tr th:first-child,
            table tr td:first-child {
              display: none;
            }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();


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

  function onSavefile2() {
    if (ApprovedCustomers.length > 0) {
      const headers = Object.keys(RejectedCustomers[0]);
      const csvData = RejectedCustomers.map(item => headers.map(key => item[key]));
      const finalcsv = [headers, ...csvData];
      SetCSVDATA2(finalcsv);
    }
  }

  function handleCheckboxChange(customer) {
    const id = customer.PropertyID;

    setSelectedCustomers(prev =>
      prev.includes(id)
        ? prev.filter(pid => pid !== id)
        : [...prev, id]
    );
  }

  async function handleApprove(e) {
    if (selectedCustomers.length <= 0) {
      return alert("You have not selected ID !!!!");
    }

    for (const id of selectedCustomers) {
      await ApproveBulkApplication(id, "Approved");
    }
    alert(`Customers has approved`);
    SubmitLocality(e)
    setSelectedCustomers([]);
  }

  const HandleBulkReject = async (e) => {
    e.preventDefault();

    if (selectedCustomers.length <= 0) {
      return alert("You have not selected ID !! ")
    }

    try {
      for (const id of selectedCustomers) {
        let res = await ApproveBulkApplication(id, "Rejected");
      }
      alert("Successfully Selected Customer are Rejected !!!");
      SubmitLocality(e)
      setSelectedCustomers([]);
    }
    catch (err) {
      console.log(err);
    }
  }

  const optionCustomerData = Array.isArray(Customer) ? Customer.filter(c => c.Approvance == options) : [];
  const pendingCustomers = Array.isArray(Customer) ? Customer.filter(c => c.Approvance === "Pending") : [];
  const ApprovedCustomers = Array.isArray(Customer) ? Customer.filter(c => c.Approvance === 'Approved') : [];
  const RejectedCustomers = Array.isArray(Customer) ? Customer.filter(c => c.Approvance === 'Rejected') : [];

  console.log("Option Data :: ", optionCustomerData);
  console.log("Pending Customer :: ", pendingCustomers);
  console.log("Approved Customer :: ", ApprovedCustomers);
  console.log("Rejected Customer :: ", RejectedCustomers);

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.id]: e.target.value,  // Use e.target.id to correctly identify the form field
    });
    if (e.target.id === 'Ward') {
      setSelectedWard(e.target.value);
    }
  };

  const uniqueWards = Array.from(new Set(Locality.map(e => e.Ward)));
  const uniqueMeter = Array.from(new Set(Locality.map(e => e.Meter)));

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
      <div style={{ display: "grid", width: "80vw", margin: "auto" }}>
        <form onSubmit={SubmitLocality} style={{ display: 'flex', width: '80%', flexWrap: "wrap", padding: '3%', borderRadius: '20px', backgroundColor: '#f2f4f7', marginTop: '10px 1imor', margin: "auto" }}>

          <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
            <label style={{ fontWeight: 'bold' }}>Ward</label><br />

            <select className="form-select mt-2" id="Ward" onChange={handleChange}>
              <option disabled selected>Select Ward</option>
              {uniqueWards &&
                uniqueWards.map((e, i) => (
                  <option className="form-control" key={i} value={e} style={{ textTransform: "capitalize" }}>{e}</option>
                ))}
            </select>
          </div>

          <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
            <label style={{ fontWeight: 'bold' }}>Road Width</label><br />
            <select className="form-select mt-2" id="Meter" onChange={handleChange} required>
              <option disabled selected>Select Road Width</option>
              {uniqueMeter && uniqueMeter.map((e) => (
                <option className="form-control mt-2" value={e} >{e}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <button type='submit' className='btn btn-dark mx-4 mt-3' style={{ width: '20vw' }} >Get Owners</button>
          </div>
        </form>


        <div className="col-12 my-4">
          <div className="col-10 m-auto">
            <div className="col-12">
              <div className="row">
                <div className="col-3 my-auto">
                  <p className='fw-bold h5 my-auto'>Customer Status</p>
                </div>

                <div className="col-8">
                  <select name="" id="" onChange={(e) => setOptions(e.target.value)} className='py-1' style={{ width: "100%" }}>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>


              </div>
            </div>
          </div>
        </div>

        <div className="col-12 px-3 my-auto">
          <h3>{options} Customer</h3>
        </div>


        <div className="col-12">
          <div className="table-responsive " style={{ width: "78vw" }}>

            <div className='col-12 my-5 tableContainer printableTable' id="printableTable">
              <table className=" col-12" ref={pendingRef}>
                <thead>
                  <tr>
                    <th style={{ width: "5%" }}></th>
                    <th style={{ width: "12%" }}>Property ID</th>
                    <th style={{ width: "10%" }}>FullName</th>
                    <th style={{ width: "7%" }}>TotalArea</th>
                    <th style={{ width: "8%" }}>Area Used</th>
                    <th style={{ width: "8%" }}>Total ARV</th>
                    <th style={{ width: "8%" }}>Location</th>
                    <th style={{ width: "7%" }}>Meter</th>
                    <th style={{ width: "8%" }}>locality</th>
                    <th style={{ width: "9%" }}>ContactNumber</th>
                    <th style={{ width: "9%" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    optionCustomerData.length > 0 ? (
                      optionCustomerData.map((val, index) => {
                        return (
                          <tr key={index}>
                            <td><input
                              type="checkbox"
                              checked={selectedCustomers.includes(val.PropertyID)}
                              onChange={() => handleCheckboxChange(val)}
                            /></td>
                            <td>{val.PropertyID}</td>
                            <td>{val.FullName}</td>
                            <td>{Math.round(val.TotalArea)}</td>
                            <td>{Math.round(val.Area_Use)}</td>
                            <td>{Math.round(val.TotalARV)}</td>
                            <td>{val.location}</td>
                            <td>{val.Meter}</td>
                            <td>{val.locality}</td>
                            <td>{val.ContactNumber}</td>
                            <td className={val.Approvance == "Approved" ? "fw-bold text-success" : "fw-bold text-danger"}>{val.Approvance}</td>
                          </tr>

                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan="11" className='fw-bold text-center py-3'>No pending customer data available</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>

            {(options == "Pending" && optionCustomerData.length > 0) &&
              (
                <div className="col-12 text-center">

                  <button onClick={handleApprove} className='btn btn-success my-3 fw-bold px-4'>Approve Selected Customers</button>


                  <button onClick={HandleBulkReject} className='btn btn-danger my-3 mx-3 fw-bold px-4'>Reject Selected Customers</button>
                </div>
              )}
          </div>

          {Array.isArray(pendingCustomers) && pendingCustomers.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div>
                <button onClick={() => handleDownloadPDF('printableTable')} className='btn btn-success my-3'>Download {options} Customers PDF</button>
              </div>
              <div>
                <CSVLink data={CSVDATA} target="blank" onClick={onSavefile} className='my-3 btn btn-primary' style={{ margin: "20px", width: '20vw' }}> Download Excel</CSVLink>
              </div>
            </div>
          )}
        </div>







        {/* {
          options === "Approved" &&
          (
            <div className="col-12">
              <div className="table-responsive " style={{ width: "78vw" }}>
                <div>
                  <table id="printableTable1" className="table table-striped table-hover table-bordered table-primary align-middle mt-2 printableTable" ref={approvedRef}>
                    <thead className="table-light">
                      <tr>
                        <th>Property ID</th>
                        <th>FullName</th>
                        <th>TotalArea</th>
                        <th>Area Used</th>
                        <th>Total ARV</th>
                        <th>Location</th>
                        <th>Meter</th>
                        <th>locality</th>
                        <th>ContactNumber</th>
                        <th>Document Photos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(ApprovedCustomers) && ApprovedCustomers.length > 0 ? (
                        <Pagination data={ApprovedCustomers} perPageItems={15} func={c => cards(c)} searchparam={["PropertyID", "FullName", "ContactNumber"]} searchword={s} useeffectactive={locality} />
                      ) : (
                        <tr>
                          <td colSpan="14">No approved customer data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {Array.isArray(ApprovedCustomers) && ApprovedCustomers.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div>
                    <button onClick={() => handleDownloadPDF('printableTable1')} className='btn btn-success my-3'>Download Approved Customers PDF</button>
                  </div>
                  <div>
                    <CSVLink data={CSVDATA1} target="blank" onClick={onSavefile1} className='my-3 btn btn-primary' style={{ margin: "20px", width: '20vw' }}> Download Excel</CSVLink>
                  </div>
                </div>
              )}
            </div>
          )
        }

        {
          options === "Rejected" &&
          (
            <div className="col-12">
              <div className="table-responsive " style={{ width: "78vw" }}>
                <div>
                  <table id="printableTable2" className="table table-striped table-hover table-bordered table-primary align-middle mt-2 printableTable" ref={approvedRef}>
                    <thead className="table-light">
                      <tr>
                        <th>Property ID</th>
                        <th>FullName</th>
                        <th>TotalArea</th>
                        <th>Area Used</th>
                        <th>Total ARV</th>
                        <th>Location</th>
                        <th>Meter</th>
                        <th>locality</th>
                        <th>ContactNumber</th>
                        <th>Document Photos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(RejectedCustomers) && RejectedCustomers.length > 0 ? (
                        <Pagination data={RejectedCustomers} perPageItems={15} func={c => cards(c)} searchparam={["PropertyID", "FullName", "ContactNumber"]} searchword={s} useeffectactive={locality} />
                      ) : (
                        <tr>
                          <td colSpan="14">No approved customer data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {Array.isArray(RejectedCustomers) && RejectedCustomers.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div>
                    <button onClick={() => handleDownloadPDF('printableTable2')} className='btn btn-success my-3'>Download Approved Customers PDF</button>
                  </div>
                  <div>
                    <CSVLink data={CSVDATA2} target="blank" onClick={onSavefile2} className='my-3 btn btn-primary' style={{ margin: "20px", width: '20vw' }}> Download Excel</CSVLink>
                  </div>
                </div>
              )}
            </div>
          )
        } */}




        {/* Array.isArray(pendingCustomers) && pendingCustomers.length > 0 ? (
        <Pagination
          data={pendingCustomers}
          perPageItems={15}
          func={c => cards(c, true)}
          searchparam={["PropertyID", "FullName", "ContactNumber"]}
          searchword={s}
          useeffectactive={locality} /> */}


      </div>
    </>
  )
}

export default Page
