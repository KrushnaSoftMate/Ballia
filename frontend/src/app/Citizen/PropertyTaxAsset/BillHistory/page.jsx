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

        const trimmedPropertyId = propertyid.Para?.trim(); // Trim white spaces
        console.log(trimmedPropertyId)
        
        if (trimmedPropertyId) {
            let data = await GetBillHistory(trimmedPropertyId)
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
            <div style={{ padding: '20px' }}>
                <img src='/Back-Arrow.png' style={{ width: '30px', cursor: 'pointer', border: '2px solid #968eff', borderRadius: '50px' }} alt="Back" onClick={() => window.history.back()} />
                <h5 style={{ fontWeight: '700', padding: '10px' }}>Payment History</h5>
                <div style={{ background: "linear-gradient(to right, #ffe1e3, #f9edef)", padding: '10px', borderRadius: '10px', height: '7rem', display: 'flow', paddingTop: ' 1.5rem', justifyContent: 'center', alignItems: 'center' }}>
                    <form onSubmit={BillHistory} style={{ display: "flex", justifyContent: 'center', alignItems: 'baseline', gap: '20px' }}>
                        <p style={{ color: "black", fontWeight: '700', fontSize: '18px' }}>Property Tax Details</p>
                        <input style={{ width: '45%' }} className="form-control" type="text" id="Para" placeholder="Enter PropertyID Here" onChange={(e) => SetPropertyID({ ...propertyid, [e.currentTarget.id]: e.target.value })} />
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <button type="submit" style={{ background: "linear-gradient(to right, #fc3e04 , #ec931f)", color: "white", fontWeight: '700' }} className="my-2 mx-2 btn">Get Details</button>
                            <button type="button" onClick={toPDF} style={{ backgroundColor: 'tranparent', color: "white", border: '1px solid white' }} className="my-2 btn" hidden={history[0]?.PropertyID === undefined ? true : false}>Print History</button>
                        </div>
                    </form>
                </div>
                <div hidden={history[0]?.PropertyID === undefined ? true : false} style={{ overflowX: 'auto', width: '100%' }} className='table-responsive'>
                    <div style={{ padding: "25px" }}>
                        <div style={{ display: "grid", borderRadius: "20px", padding: "10px", backgroundColor: 'white', overflowX: 'auto' }}>
                            <div style={{ border: "1px solid darkgray", overflowX: 'auto' }}>
                                <table style={{ backgroundColor: '#e8f7f3', overflowX: 'auto' }} ref={targetRef}>
                                    <thead>
                                        <tr>
                                            <th style={{ paddingRight: '20px' }}>Property ID</th>
                                            <th style={{ paddingRight: '20px' }}>Bill Number</th>
                                            <th style={{ paddingRight: '20px' }}>From Date</th>
                                            <th style={{ paddingRight: '20px' }}>To Date</th>
                                            <th style={{ paddingRight: '20px' }}>Area</th>
                                            <th style={{ paddingRight: '20px' }}>Tax Rate</th>
                                            <th style={{ paddingRight: '20px' }}>Amount</th>
                                            <th style={{ paddingRight: '20px' }}>Due Amount</th>
                                            <th style={{ paddingRight: '20px' }}>Total Amount</th>
                                            <th style={{ paddingRight: '20px' }}>Paid Amount</th>
                                            <th style={{ paddingRight: '20px' }}>Remaining</th>
                                            <th style={{ paddingRight: '20px' }}>Creation Date</th>
                                            <th style={{ paddingRight: '20px' }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            history && history.map((e) => {
                                                return (
                                                    <tr style={{ backgroundColor: 'white' }}>
                                                        <td style={{ paddingRight: '20px' }}>{e.PropertyID}</td>
                                                        <td style={{ paddingRight: '20px' }}>{e.BillNumber}</td>
                                                        <td style={{ paddingRight: '20px' }}>{e.FromDate}</td>
                                                        <td style={{ paddingRight: '20px' }}>{e.ToDate}</td>
                                                        <td style={{ paddingRight: '20px' }}>{e.Area}</td>
                                                        <td style={{ paddingRight: '20px' }}>{e.TaxRate}</td>
                                                        <td style={{ paddingRight: '20px' }}>{e.Amount}</td>
                                                        <td style={{ paddingRight: '20px' }}>{e.DueAmount}</td>
                                                        <td style={{ paddingRight: '20px' }}>{e.TotalAmount}</td>
                                                        <td style={{ paddingRight: '20px' }}>{e.PaidAmount}</td>
                                                        <td style={{ paddingRight: '20px' }}>{e.Remaining}</td>
                                                        <td style={{ paddingRight: '20px' }}>{e.Creation_Date}</td>
                                                        <td style={{ paddingRight: '20px' }}>{e.Status}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page
