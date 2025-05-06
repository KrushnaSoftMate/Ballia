'use client'
import React, { useContext, useRef, useState, useEffect } from 'react'
import { Agent } from '@/app/AdminContext/AgentManagement'
import Link from 'next/link'
import { Admin } from '../../../AdminContext/AdminManageMent'
import Pagination from '@/Components/pagination'
import { CSVLink } from 'react-csv'
const page = () => {
    const { GetCustomerList, ApproveLicenceApplication } = useContext(Admin)
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
    const [Meter, SetMeter] = useState([])
    const [Locality, SetLocality] = useState([]);
    useEffect(() => {
        GetBill()
        SubmitLocality()
    }, [])

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

    function handleCheckboxChange(detail1) {
        setSelectedCustomers(prevState =>
          prevState.includes(detail1)
            ? prevState.filter(c => c !== detail1)
            : [...prevState, detail1]
        );
      }

    async function handleApprove() {    
        for (const detail of selectedCustomers) {
            await ApproveLicenceApplication(detail.Gala, "Approved");
        }
        alert("Customer Approved")
        SubmitLocality(locality);  // refresh the list after approval
        setSelectedCustomers([]);
        window.location.reload()
    }
    async function SubmitLocality(e) {
        SetCustomer([]);
        let datalocality = await GetCustomerList(formdata)
        console.log(datalocality);
        SetCustomer([...datalocality]);
        SetLocality(datalocality?.Locality)
        SetHelper(datalocality?.locality)
        SetMeter(datalocality?.Meter)
        console.log(detail);
    }
    const { GetLicenseDetails } = useContext(Agent)
    const [detail, Setdetail] = useState()
    async function GetBill() {
        let data = await GetLicenseDetails()
        console.log(data);
        Setdetail(data);
    }
 
    const pendingCustomers = Array.isArray(detail) ? detail.filter(c => c.Approvance === 'Pending') : [];
    const ApprovedCustomers = Array.isArray(detail) ? detail.filter(c => c.Approvance === 'Approved') : [];
    function cards(e,isPending) {
        return (
            <tr className="table-primary" key={e?.Gala}>
                {isPending && (
                    <td>
                        <input
                            type="checkbox"
                            checked={selectedCustomers.includes(e)}
                            onChange={() => handleCheckboxChange(e)}
                        />
                    </td>
                )}
                <td>{e.Gala}</td>
                <td>{e.FullName}</td>
                <td>{e.ContactNumber}</td>
                <td>{e.Location}</td>
                <td>{e.Address}</td>
                <td>{e.Locality}</td>
                <td>{e.Meter}</td>
                <td>{e.PermitType}</td>
                <td>{e.Area}</td>
            </tr>
        )
    }


    return (
        <>
            <div>
                <div>
                    <div style={{ display: 'flex', padding: '1rem' }}>
                        <h5><b>Get License Details</b></h5>
                    </div>
                    <div style={{ display: "grid", width: "80vw", margin: "auto" }}>

                        <div className="table-responsive m-3" style={{ width: "78vw" }}>
                            <h3>Pending Customers</h3>
                            {/* <input type='search' placeholder='Search Owners here' className='form-control mx-5 my-3' style={{ width: '50vw', textAlign: 'center', background: '#f2f4f7' }} onChange={(e) => SearchCustomer(e)} /> */}
                            <div >
                                <table id="printableTable" className="table table-striped table-hover table-bordered table-primary align-middle mt-2 printableTable" ref={pendingRef}>
                                    <thead className="table-light">
                                        <tr>
                                            <th>Check Box</th>
                                            <th>Licence ID</th>
                                            <th>FullName</th>
                                            <th>ContactNumber</th>
                                            <th>Location</th>
                                            <th>Address</th>
                                            <th>Locality</th>
                                            <th>Meter</th>
                                            <th>Permit Type</th>
                                            <th>Area</th>
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

                            {Array.isArray(pendingCustomers) && pendingCustomers.length > 0 && (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button style={{ width: '20rem' }} onClick={handleApprove} className='btn btn-warning form-control my-3'>Approve Selected Customers</button>
                                </div>
                            )}
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

                        <div className="table-responsive m-3" style={{ width: "78vw" }}>
                            <h3>Approved Customers</h3>
                            <div>
                                <table id="printableTable1" className="table table-striped table-hover table-bordered table-primary align-middle mt-2 printableTable" ref={approvedRef}>
                                    <thead className="table-light">
                                        <tr>
                                        <th>Licence ID</th>
                                            <th>FullName</th>
                                            <th>ContactNumber</th>
                                            <th>Location</th>
                                            <th>Address</th>
                                            <th>Locality</th>
                                            <th>Meter</th>
                                            <th>Permit Type</th>
                                            <th>Area</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(ApprovedCustomers) && ApprovedCustomers.length > 0 ? (
                                            <Pagination data={ApprovedCustomers} perPageItems={15} func={c => cards(c,false)} searchparam={["PropertyID", "FullName", "ContactNumber"]} searchword={s} useeffectactive={locality} />
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
                </div>
            </div>
        </>
    )
}

export default page
