'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Admin } from "@/app/AdminContext/AdminManageMent"
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv'
import Pagination from "@/Components/pagination"


const Reports = () => {

    const statecalls = useContext(Admin);
    const { GetDocumentForm, PropertyTypes, TransactionReport } = statecalls;
    const [renderdata, setRenderData] = useState([])
    const [docs, setDocs] = useState([])
    const [Data, setData] = useState([])
    const [FromDate, setFromDate] = useState('');
    const [ToDate, setToDate] = useState('');
    const [Reportfetcher, setReportFetcher] = useState()
    const [Locality, SetLocality] = useState([])
    const [propertyType, setPropertyType] = useState([])
    const [CSVDATA, SetCSVDATA] = useState([])

    const [formData, setFormData] = useState({
        FromDate: '',
        ToDate: '',
        locality: '',
        PropertyType: '',
        mode: '',
        Discount: '',
    });

    useEffect(() => {
        GetForm()
        getLocality()
    }, [])

    async function GetForm() {
        let data = await GetDocumentForm();
        SetLocality(data.locality)
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setReportFetcher({ ...Reportfetcher, [e.target.name]: true })
        console.log(formData);
    };

    async function getLocality() {
        const data = await PropertyTypes();
        setPropertyType(data)
    }


    async function handleSubmit(e) {
        e.preventDefault()
        const data1 = await TransactionReport(formData)
        console.log(data1);
        if (data1) {
            // <Link href={"/Admin/Report/TransactionReport/"+e.locality+"/"+e.PropertyType+"/"+e.payment_source} ></Link>
            // window.location.href="/Admin/Report/TransactionReports/"+e.locality+"/"+e.PropertyType+"/"+e.payment_source
        }
        setData(data1)
    }

    function onSavefile() {
        if (Data.length > 0) {
            const headers = Object.keys(Data[0]);
            const csvData = Data.map(item => headers.map(key => item[key]));
            const finalcsv = [headers, ...csvData];
            SetCSVDATA(finalcsv);
        }
    }

    function cards(e,index) {
        return (
            <>
                <tr>
                    <td>{index+1}</td>
                    <td>{e.id}</td>
                    <td>{e.PropertyID}</td>
                    <td>{e.FullName}</td>
                    <td>{e.locality}</td>
                    <td>{e.PropertyType}</td>
                    <td>{e.PaidAmount}</td>
                    <td>{e.TotalAmount}</td>
                    <td>{e.Remaining}</td>
                    <td>{e.Discount}</td>
                    <td>{e.payment_source}</td>
                    <td>{e.mode}</td>
                    <td>{e.addedon}</td>

                </tr>
            </>
        )
    }

    return (
        <>
            <h4>Transaction Reports</h4>
            <div style={{
                display: 'grid',
                border: '2px solid',
                borderRadius: '20px',
                border: 'none',
                padding: '30px',
                backgroundColor: 'whitesmoke',
            }}>
                <form style={{ display: 'flex', width: '100%', flexWrap: "wrap", padding: '1%', borderRadius: '20px', backgroundColor: 'white', marginTop: '10px' }} onSubmit={handleSubmit}>

                    <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                        <label style={{ fontWeight: 'bold' }}>From Date</label><br />
                        <input className='form-control mt-2' type='date' name='FromDate' onChange={handleChange} />
                    </div>

                    <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                        <label style={{ fontWeight: 'bold' }}>To Date</label><br />
                        <input className='form-control mt-2' type='date' name='ToDate' onChange={handleChange} />
                    </div>

                    {/* <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                        <label>Select Locality</label>
                        <select className="form-select" name="locality" onChange={handleChange}>
                            <option disabled selected>Select Locality</option>
                            {Locality && Locality.map((e) => (
                                <option className="form-control" value={e.uniqueness} >{e.uniqueness}</option>
                            ))}
                        </select>
                    </div> */}
                    {/* 
                    <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                        <label>Select Property Type</label>
                        <select className="form-select" name="PropertyType" onChange={handleChange}>
                            <option disabled selected>Select Property Type</option>
                            {propertyType && propertyType.map((e) => (
                                <option className="form-control" value={e.id} >{e.PropertyType}</option>
                            ))}
                        </select>
                    </div> */}

                    <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                        <label>Select Payment Mode</label>
                        <select className="form-select" name="payment_source" onChange={handleChange}>
                            <option disabled selected>Select Mode</option>
                            <option className="form-control" value="Easebuzz">Easebuzz</option>
                            <option className="form-control" value="Cash">Cash</option>
                        </select>
                    </div>
                    {/* <label>Payment By</label>    
                <select className="form-select" style={{width:'50vw'}} name="PropertyType"  onChange={handleChange}>
                  <option disabled selected>Select</option>
                    <option className="form-control"  >Agent</option>
                    <option className="form-control"  >Customer</option>
                </select> */}
                    <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                        <label>Discount Applied</label>
                        <select className="form-select" name="Discount" onChange={handleChange}>
                            <option disabled selected>Select</option>
                            <option className="form-control" value="Yes">Yes</option>
                            <option className="form-control" value="No">No</option>
                        </select>
                    </div>

                    <button type="submit"
                        className='mx-center'
                        style={{
                            backgroundImage: '/loginimage.png',
                            height: "3rem",
                            width: '11rem',
                            color: 'white',
                            backgroundColor: '#f1772e',
                            border: 'none',
                            borderRadius: '10px',
                        }}
                    >
                        Find Transactions
                    </button>

                </form >
            </div >

            <CSVLink data={CSVDATA} target="blank" onClick={onSavefile} className='my-3 btn btn-primary' style={{ margin: "20px", width: '20vw' }}> Download Excel</CSVLink>

            <div style={{ width: '70vw', height: 'auto', overflow: 'auto', margin: '30px 60px', backgroundColor: 'white', borderRadius: '15px', marginTop: '15px', textAlign: 'center' }}>
                <div style={{ padding: "20px" }}>
                    <table className='my-2 table table-bordered'>
                        <thead className='table-light'>
                            <tr>
                                <th>Sr No.</th>
                                <th>ID</th>
                                <th>PropertyID</th>
                                <th>Name</th>
                                <th>Locality</th>
                                <th>Proptype</th>
                                <th>Paid</th>
                                <th>Total</th>
                                <th>Remaining</th>
                                <th>DiscountedAmount</th>
                                <th>Payment Method</th>
                                <th>mode</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data.length > 0 && (<Pagination data={Data} perPageItems={10} func={cards} searchparam={["FullName", "locality", "PropertyType", "PaidAmount", "TotalAmount", "Remaining", "Discount", "payment_source", "mode", "addedon"]}></Pagination>)}
                        </tbody>
                    </table>
                </div>
                {/* <nav aria-label="Page navigation example" style={{ display: 'flex', justifyContent: 'end' }}>
                    <ul className="pagination" >
                        <li className="page-item">
                            <a
                                className="page-link"
                                href="#"
                                style={{
                                    color: '#757575',
                                    borderColor: '#757575',
                                    borderRadius: '50px',
                                    marginRight: '10px',
                                }}
                            >
                                &laquo; Previous
                            </a>
                        </li>
                        <li className="page-item active mx-3">
                            <a
                                className="page-link"
                                href="#"
                                style={{
                                    color: '#f1772e',
                                    border: 'none',
                                    backgroundColor: '#face25',
                                    borderRadius: '50%',
                                    marginRight: '10px',
                                }}
                            >
                                1
                            </a>
                        </li>
                        <li className="page-item">
                            <a
                                className="page-link"
                                href="#"
                                style={{
                                    color: '#f1772e',
                                    borderColor: '#f1772e',
                                    borderRadius: '50px',
                                }}
                            >
                                Next &raquo;
                            </a>
                        </li>
                    </ul>
                </nav> */}
            </div>

        </>
    )
}

export default Reports

