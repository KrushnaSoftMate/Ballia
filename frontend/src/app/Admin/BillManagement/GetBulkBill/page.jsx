"use client"
import React, { Suspense, useContext, useEffect, useState } from 'react'
import { Admin } from "@/app/AdminContext/AdminManageMent"
import { usePDF } from 'react-to-pdf';
import './bill.css'
import { backend } from '@/app/paths';
const Page = () => {
    const { BulkBillDownload, GetDocumentForm, GZIP, FetchFolderName } = useContext(Admin);
    const [locality, SetLocality] = useState([])
    const [form, SetForm] = useState({})
    const [renderdata, SetRenderData] = useState(false)
    const [foldername, SetFolderName] = useState([])
    const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });

    useEffect(() => {
        Getlocality();
    }, []);


    async function Getlocality() {
        let Locality = await GetDocumentForm()
        let Folders = await FetchFolderName()
        console.log(Folders);
        SetLocality(Locality?.locality)
        SetFolderName(Folders)
    }

    async function Submit(e) {
        e.preventDefault()
        let BulkBill = await BulkBillDownload(form);
        if (BulkBill.success == true) {
            alert(BulkBill.message);
            SetRenderData(BulkBill.downloadUrl);
        }
        else {
            alert("Error While generating PDF !!!!!");
        }
    }

    return (
        <>
            <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '60%', width: '30%', margin: "auto" }}>
                <form onSubmit={Submit} style={{ display: "grid" }}>
                    <label>Choose Locality</label>
                    <select className='form-control' id='locality' required onChange={(e) => { SetForm({ ...form, [e.currentTarget.id]: e.target.value }) }}>
                        <option selected disabled>Select Locality</option>
                        {locality && locality.map((e) => (
                            <option value={e.uniqueness}>{e.uniqueness}</option>
                        ))}
                    </select>
                    <label className='form-label'>Number</label>
                    <input type='text' className='form-control' placeholder='Enter Number' id='Number' required onChange={(e) => { SetForm({ ...form, [e.currentTarget.id]: e.target.value }) }} />
                    <label className='form-label'>File Name</label>
                    <input type='text' className='form-control' placeholder='Enter File Name' id='FileName' required onChange={(e) => { SetForm({ ...form, [e.currentTarget.id]: e.target.value }) }} />
                    <button
                        type="submit"
                        className="btn btn-danger my-3"
                    >
                        Get Bill
                    </button>
                </form>

                {renderdata && <a href={renderdata} target='_blank'>LINK DOWNLOAD + {renderdata}</a>}
            </div>

            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Locality</th>
                        <th>Folder Name</th>
                        <th>File Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        foldername && foldername.map((e) => {
                            return (
                                <tr key={e.id}>
                                    <td>{e.id}</td>
                                    <td>{e.locality}</td>
                                    <td>{e.foldername}</td>
                                    <td>{e.numberfiles}</td>
                                    {e.status == "true" ? <td><button onClick={() => GZIP(e)} className='btn btn-danger'>ZIP</button></td> : ""}
                                    {e.status == "zip created" ? <td><a className='btn btn-dark' target='_blank' href={backend + "/Assets/" + e.foldername + ".zip"}>Download Zip</a></td> : ""}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            {/* <div ref={targetRef} >
                {renderdata && renderdata.map((e) => {
                    return (
                        <div style={{ display: "flex", justifyContent: "center", backgroundColor: '#e9f8f1' }} >

                            <div className="bill-container">
                                <div className="bill-header">
                                    <div>
                                        <img src="/UP-Logo.jpg" width="100px" alt="" />
                                    </div>
                                    <div style={{ color: 'red' }} className="municipal-council"><h1>Municipal Council, Ballia</h1></div>
                                    <div className="form">Form 17</div>
                                    <div className="bill-title">Bill (House Tax/Water Tax/Drainage Tax)</div>
                                    <div className="financial-year">Financial year 2023-2024</div>
                                </div>

                                <div className="estate-details">
                                    <div className="estate-code">Estate Code: {e.PropertyID}</div>
                                    <div className="ward">{e.uniqueness}</div>
                                </div>

                                <div style={{ border: '1px black solid', padding: '5px', backgroundColor: '#fde8e9' }}>
                                    <div className="innerheader" >
                                        <div style={{ color: '#f82228' }}>Bill number: {e.BillNumber}</div>
                                        <div>House number: {e.Plot_No}</div>
                                    </div>
                                    <div className="innerheader" >
                                        <div>Bill date: {e.ToDate}</div>
                                        <div>Use of building: {e.PropertyType}</div>
                                    </div>
                                    <div className="innerheader" >
                                        <div className="assessment-title">impressive Date : / / </div>
                                        <div className="impressive-date">Assessment: {e.Amount}</div>
                                    </div>
                                </div>

                                <div style={{ border: '1px black solid', padding: '5px', backgroundColor: '#e9f8f1' }}>
                                    <div className="innerheader" >
                                        <div>Name and address of: {e.Address}</div>
                                        <div>Mobile No :{e.ContactNumber}</div>
                                    </div>
                                    <div className="innerheader" >
                                        <div>{e.FullName}</div>
                                        <div>{e.uniqueness}</div>
                                    </div>
                                </div>



                                <div style={{ border: '1px black solid' }}>
                                    <div className="tax-details-title" style={{ textAlign: 'center' }}>Details of Taxes</div>
                                    <div className="tax-table" style={{ display: 'grid', justifyContent: 'center', }}>
                                        <table className="table table-striped tax-table-data" style={{ width: '46rem' }}>
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>Tax</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <Suspense>
                                                    {
                                                        e.breakdown && e.breakdown.map((xe) => {
                                                           
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
                                                        <span id="lbl_genTax2">{e.DueAmount}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '25%', textAlign: 'center' }}>
                                                        <b>Paid Amount</b>
                                                    </td>
                                                    <td align="center" style={{ width: '25%' }}>
                                                        <span id="lbl_genTax2">{e.PaidAmount}</span>
                                                    </td>
                                                </tr>
                                                <tr className="table-success">
                                                    <td style={{ width: '25%', textAlign: 'center' }}>
                                                        <b>Total Payable</b>
                                                    </td>
                                                    <td align="center" style={{ width: '25%' }}>
                                                        <span id="lbl_genTax2">{e.Remaining}</span>
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
                    )
                })

                }
            </div> */}
        </>
    )
}

export default Page;
