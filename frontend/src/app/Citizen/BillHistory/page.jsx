"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Customer } from "@/app/AdminContext/CustomerManagement"
import { usePDF } from 'react-to-pdf'

const page = () => {
    const { GetBillHistory } = useContext(Customer)
    const [history, SetHistory] = useState([])
    const [propertyid, SetPropertyID] = useState([])
    const { toPDF, targetRef } = usePDF({ filename: 'BillHistory.pdf' });

    async function BillHistory(e) {
        e.preventDefault()
        if (propertyid.Para) {
            let data = await GetBillHistory(propertyid.Para)
            if (data.length > 0) {
                SetHistory(data)
            } else {
                alert("Please Enter Correct Property ID")
                SetHistory([])
            }
        } else {
            alert("Please Enter Property ID")
            SetHistory([])
        }
    }

    return (
        <>
            <div style={{ height: '50vh', display: "grid", justifyContent: "center", alignItems: 'center', backgroundImage: 'url(/Property-Banner.png)', backgroundSize: 'cover' }}>
                <form onSubmit={BillHistory} style={{ height: '13vh', display: "grid" }}>
                    <h3 style={{ color: "white", textAlign: 'center', marginBottom: '15px' }}>Property Tax Details</h3>
                    <input style={{ width: '20rem' }} className="form-control" type="text" id="Para" placeholder="Enter PropertyID Here" onChange={(e) => SetPropertyID({ ...propertyid, [e.currentTarget.id]: e.target.value })} />
                    <div style={{ display: "flex", justifyContent: "center", marginTop: '15px' }}>
                        <button type="submit" style={{ backgroundColor: '#ec931f', color: "white" }} className="my-2 mx-2 btn">Get Details</button>
                        <button type="button" onClick={toPDF} style={{ backgroundColor: 'tranparent', color: "white", border: '1px solid white' }} className="my-2 btn" hidden={history[0]?.PropertyID === undefined ? true : false}>Print History</button>
                    </div>
                </form>
            </div>
            <div hidden={history[0]?.PropertyID === undefined ? true : false} style={{overflow:'auto'}}>
                <table className='table table-bordered' ref={targetRef}>
                    <thead>
                        <tr>
                            <th>Property ID</th>
                            <th>Bill Number</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Area</th>
                            <th>Tax Rate</th>
                            <th>Amount</th>
                            <th>Due Amount</th>
                            <th>Total Amount</th>
                            <th>Paid Amount</th>
                            <th>Remaining</th>
                            <th>Creation Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            history && history.map((e) => {
                                return (
                                    <tr>
                                        <td>{e.PropertyID}</td>
                                        <td>{e.BillNumber}</td>
                                        <td>{e.FromDate}</td>
                                        <td>{e.ToDate}</td>
                                        <td>{e.Area}</td>
                                        <td>{e.TaxRate}</td>
                                        <td>{e.Amount}</td>
                                        <td>{e.DueAmount}</td>
                                        <td>{e.TotalAmount}</td>
                                        <td>{e.PaidAmount}</td>
                                        <td>{e.Remaining}</td>
                                        <td>{e.Creation_Date}</td>
                                        <td>{e.Status}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default page
