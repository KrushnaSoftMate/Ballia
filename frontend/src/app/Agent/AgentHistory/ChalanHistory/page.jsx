'use client'
import React, { useState, useContext, useEffect } from 'react'
import { Agent } from "../../../AdminContext/AgentManagement"
import Link from 'next/link';

const page = () => {
    const statecalls = useContext(Agent);
    const { AgentTranscationHistory } = statecalls
    const [history, setHistory] = useState([])
    const [FromDate, setFromDate] = useState('');
    const [ToDate, setToDate] = useState('');
    const [Limit, setLimit] = useState('10');

    useEffect(() => {
        GetData()
    }, [])

    const handleFromDateChange = (event) => {
        const { value } = event.currentTarget;
        setFromDate(value);
        // Update the 'to' date input value to the same as 'from' date
        setToDate(value);
    };

    const handleToDateChange = (event) => {
        const { value } = event.currentTarget;
        setToDate(value);
    };

    const handleLimitChange = (event) => {
        setLimit(event.currentTarget.value);
    };

    async function GetData() {
        let data = await AgentTranscationHistory(FromDate, ToDate, Limit)
        setHistory(data)
        // console.log(data);
    }

    return (
        <div>
            <div style={{ padding: "20px" }}>
                <h4>Chalan Payment History</h4>
            </div>

            <div className='my-3' style={{ display: 'flex', justifyContent: "space-evenly", flexWrap: "wrap" }}>
                <p>From Date</p>
                <input type='date' onChange={handleFromDateChange} value={FromDate}></input>
                <p>To Date</p>
                <input type='date' onChange={handleToDateChange} value={ToDate}></input>
                <p>Limit</p>
                <input type='number' onChange={handleLimitChange} value={Limit}></input>
                <button style={{ backgroundColor: 'green' }} type='button' onClick={GetData}>Get Data</button>
            </div>

            <div style={{ width: '70vw', backgroundColor: 'white', borderRadius: '15px', margin: '25px 45px', textAlign: 'center', overflow: 'auto' }}>
                <table className='table table-bordered'>
                    <thead className='table-light'>
                        <tr>
                            <th>Action</th>
                            <th>ID</th>
                            <th>txn ID</th>
                            <th>Customer ID</th>
                            <th>Bill Number</th>
                            <th>Status</th>
                            <th>Product Info</th>
                            <th>Payment Source</th>
                            <th>Net Amount Debited</th>
                            <th>Mode</th>
                            <th>Hash Id</th>
                            <th>Email</th>
                            <th>easepayid</th>
                            <th>Added on</th>
                            <th>Agent ID</th>
                            <th>Payment Mode</th>
                            <th>Crypto ID</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            history && history.map((e) => {
                                return (
                                    <tr>
                                        <td><Link type='button' href={"/Reciept/" + e.BillNumber} className='btn btn-warning'>Print Reciept</Link></td>
                                        <td>{e.ID}</td>
                                        <td>{e.txnid}</td>
                                        <td>{e.CustomerID}</td>
                                        <td>{e.BillNumber}</td>
                                        <td>{e.status}</td>
                                        <td>{e.productinfo}</td>
                                        <td>{e.payment_source}</td>
                                        <td>{e.net_amount_debit}</td>
                                        <td>{e.mode}</td>
                                        <td>{e.hash}</td>
                                        <td>{e.email}</td>
                                        <td>{e.easepayid}</td>
                                        <td>{e.addedon}</td>
                                        <td>{e.AgentID}</td>
                                        <td>{e.PaymentMode}</td>
                                        <td>{e.cryptoid}</td>        
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default page