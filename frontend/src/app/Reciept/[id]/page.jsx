'use client'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { Customer } from '@/app/AdminContext/CustomerManagement'
import { usePDF } from 'react-to-pdf'

const page = ({ params }) => {

    const statecalls = useContext(Customer)
    const { GetReciept, GetPermitReciept } = statecalls
    const [renderdata, setRenderData] = useState([])
    const [permitdata, setPermitData] = useState([])
    const { toPDF, targetRef } = usePDF({ filename: 'Reciept.pdf' });

    useEffect(() => {
        Reciept()
    }, [])
    async function Reciept() {
        const data = await GetReciept(params.id);
        const data1 = await GetPermitReciept(params.id);
        setPermitData(data1[0])
        setRenderData(data[0]);
    }
    const RenderFromDate = renderdata?.FromDate || permitdata?.FromDate?.split('T')[0]
    const RenderToDate = renderdata?.ToDate?.split('T')[0] || permitdata?.ToDate?.split('T')[0]
    const Renderadded = renderdata?.addedon?.split('T')[0] || permitdata?.addedon?.split('T')[0]

    return (
        <>
            <div style={{ padding: "20px" }}>
                <div ref={targetRef} style={{ border: "2px solid black", padding: "10px", display: "grid" }}>
                    <div style={{ border: "1px solid grey", marginTop: "5px", padding: "20px 55px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ display: "flex" }}>
                                <h4>RECEIPT NO.</h4>
                                <h4>{renderdata?.ID}{permitdata?.ID}</h4>
                            </div>
                            <div style={{ display: "grid", textAlign: "center" }}>
                                <h2><b>FORM No. 5</b></h2>
                                <h2><b>RECEIPT</b></h2>
                                <h2><b>Municipality Ballia</b></h2>
                            </div>
                            <div>
                                <h4>BOOK NO. </h4>
                            </div>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            <div style={{ display: "grid" }}>
                                <div className='my-3' style={{ display: "flex", alignItems: "end", flexWrap: "wrap", paddingLeft: "50px" }}>
                                    <div>
                                        <h2 style={{ fontStyle: "italic" }}><b>Municipality</b></h2>
                                    </div>
                                    <div className='col' style={{ textAlign: "center" }}>
                                        {/* <h4>Mirzapur</h4> */}
                                        <div style={{ border: "1px solid black", height: "1px" }}>
                                        </div>
                                    </div>
                                </div>
                                <div className='my-3' style={{ display: "flex", alignItems: "end", flexWrap: "wrap", paddingLeft: "50px" }}>
                                    <div>
                                        <h2>Demand Register no. </h2>
                                    </div>
                                    <div className='col' style={{ textAlign: "center" }}>
                                        <h4>{renderdata?.PropertyID}{permitdata?.BillNumber}</h4>
                                        <div style={{ border: "1px solid black", height: "1px" }}>
                                        </div>
                                    </div>
                                </div>
                                <div className='my-3' style={{ display: "flex", alignItems: "end", flexWrap: "wrap" }}>
                                    <div>
                                        <h2>Received from</h2>
                                    </div>
                                    <div className='col' style={{ textAlign: "center" }}>
                                        <h4>{renderdata?.FullName}{permitdata?.FullName}</h4>
                                        <div style={{ border: "1px solid black", height: "1px" }}>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className='my-3' style={{ display: "flex", alignItems: "end", flexWrap: "wrap" }}>
                                    <div>
                                        <h2>Rupees (in words)</h2>
                                    </div>
                                    <div className='col' style={{ textAlign: "center" }}>
                                        <h4>One Thousand Two Hundred Fifty Five Only</h4>
                                        <div style={{ border: "1px solid black", height: "1px" }}>
                                        </div>
                                    </div>
                                </div> */}
                                <div className='my-3' style={{ display: "flex", alignItems: "end", flexWrap: "wrap" }}>
                                    <div>
                                        <h2>on account of</h2>
                                    </div>
                                    <div className='col' style={{ textAlign: "center" }}>
                                        {/* <h4>Mirzapur Municipalty</h4> */}
                                        <div style={{ border: "1px solid black", height: "1px" }}>
                                        </div>
                                    </div>
                                    <div>
                                        <h2>of</h2>
                                    </div>
                                </div>
                                <div className='my-3' style={{ display: "grid" }}>
                                    <div style={{ display: "flex", alignItems: "end", flexWrap: "wrap" }}>
                                        <div>
                                            <h2>premises no.</h2>
                                        </div>
                                        <div className='col' style={{ textAlign: "center" }}>
                                            <h4>{renderdata?.Plot_No}{permitdata?.Gala}</h4>
                                            <div style={{ border: "1px solid black", height: "1px" }}>
                                            </div>
                                        </div>
                                        <div>
                                            <h2>Mohalla</h2>
                                        </div>
                                        <div className='col' style={{ textAlign: "center" }}>
                                            <h5>{renderdata?.locality}{permitdata?.Locality}</h5>
                                            <div style={{ border: "1px solid black", height: "1px" }}>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className='col' style={{ textAlign: "center" }}>
                                        <h4>Kothrud</h4>
                                        <div style={{ border: "1px solid black", height: "1px" }}>

                                        </div>
                                    </div> */}
                                </div>
                                <div className='my-3' style={{ display: "flex", alignItems: "end", flexWrap: "wrap" }}>
                                    <div>
                                        <h2>For the period</h2>
                                    </div>
                                    <div className='col' style={{ textAlign: "center" }}>
                                        <h4>{RenderFromDate} To  {RenderToDate}</h4>
                                        <div style={{ border: "1px solid black", height: "1px" }}>
                                        </div>
                                    </div>
                                </div>
                                <div className='my-3' style={{ display: "flex", alignItems: "end", flexWrap: "wrap" }}>
                                    <div>
                                        <h2>in full/part payment of demand bill no.</h2>
                                    </div>
                                    <div className='col' style={{ textAlign: "center" }}>
                                        <h4>{renderdata?.BillNumber}{permitdata?.BillNumber}</h4>
                                        <div style={{ border: "1px solid black", height: "1px" }}>
                                        </div>
                                    </div>
                                    <div>
                                        <h2>dated</h2>
                                    </div>
                                    <div className='col' style={{ textAlign: "center" }}>
                                        <h4>{RenderFromDate}</h4>
                                        <div style={{ border: "1px solid black", height: "1px" }}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='my-3' style={{ marginTop: "20px" }}>
                            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                                <div className='col-4' style={{ display: "grid" }}>
                                    <div className='my-3' style={{ display: "flex", alignItems: "end", flexWrap: "wrap" }}>
                                        <div>
                                            <h2>Rs.</h2>
                                        </div>
                                        <div className='col' style={{ textAlign: "center" }}>
                                            <h4>{renderdata?.net_amount_debit}{permitdata?.net_amount_debit}</h4>
                                            <div style={{ border: "1px solid black", height: "1px" }}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='my-3' style={{ display: "flex", alignItems: "end", flexWrap: "wrap", marginTop: "10px" }}>
                                        <div>
                                            <h2>Dated</h2>
                                        </div>
                                        <div className='col' style={{ textAlign: "center" }}>
                                            <h4>{Renderadded}</h4>
                                            <div style={{ border: "1px solid black", height: "1px" }}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4>Executive Officer/Secretary</h4>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                                <div className='col-4' style={{ display: "grid", justifyContent: "center" }}>
                                    <div style={{ display: "flex" }}>
                                        <div>
                                            <h2>Cashier</h2>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div>
                                            <h2>Accountant.</h2>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: "grid", textAlign: "center" }}>
                                    <h4>Tax Collector,</h4>
                                    <h4>Cleark-in-charge of demand</h4>
                                    <h4>and collection Register</h4>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                                <div className='col-4' style={{ display: "grid", justifyContent: "center" }}>
                                </div>
                                <div>
                                    <h4>Tax Superintendent.</h4>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4>PSUP-01 Nagar Palika-11.07.2023-5,000 Books (D.T.P./Offset).</h4>
                        </div>
                        <div style={{color:'orange',textAlign:'center'}}>
                            <h2>"सभी भवनवासी समय से भुगतान कर छूट का लाभ लें।"</h2>
                        </div>
                        {/* <div style={{color:'green',textAlign:'center'}}>
                            <h2>"Green Mirzapur Clean Mirzapur"</h2>
                        </div> */}
                    </div>
                </div>
                <div>
                    <button onClick={toPDF} className='btn btn-success form-control my-3'>Print Reciept</button>
                </div>
            </div>
        </>
    )
}

export default page