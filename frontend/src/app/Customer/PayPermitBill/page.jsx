"use client";
import { Customer } from "@/app/AdminContext/CustomerManagement";
import Link from "next/link";
import React, { useState, useContext, useEffect, Suspense } from "react";
import './paypermitbill.css'
const CustomerBill = (props) => {
    const statecalls = useContext(Customer);
    const { GetPermitBills } = statecalls;
    const [customerbill, SetCustomerBill] = useState([])
    const [billdata, setBillData] = useState({});

    const getBill = async (e) => {
        e.preventDefault();
        if (billdata.Para) {
            const data = await GetPermitBills(billdata.Para);
            if (data.length > 0) {
                SetCustomerBill(data)
            } else {
                alert("Please Enter Correct Details")
                SetCustomerBill([])
            }
        } else {
            alert("Please Enter Details")
            SetCustomerBill([])
        }
    };
    async function GetHashKey(x) {
        // console.log(x);
    }
    return (
        <>
            <div
                style={{ height: '45vh', display: "grid", justifyContent: "center", alignItems: 'center', backgroundImage: 'url(/Property-Banner.png)', backgroundSize: 'cover' }}
            >

                <form onSubmit={getBill} style={{ height: '13vh', display: "grid" }}>
                    <h3 style={{ color: "white", textAlign: 'center', marginBottom: '15px' }}>Municipal Council, Ballia</h3>
                    <input
                        className="form-control"
                        type="text"
                        id="Para"
                        placeholder="Enter Contact/Aadhar/Bill Number Here"
                        onChange={(e) =>
                            setBillData({ ...billdata, [e.currentTarget.id]: e.target.value })
                        }
                    />
                    <div style={{ display: "flex", justifyContent: "center", marginTop: '15px' }}>
                        <button style={{ backgroundColor: '#ec931f', color: "white" }} className="my-2 mx-2 btn">Get Permit Bill</button>

                    </div>
                </form>
            </div>

            <div hidden={customerbill[0]?.BillNumber === undefined ? true : false}
                style={{
                    display: 'grid',
                    border: '2px solid',
                    borderRadius: '20px',
                    border: 'none',
                    padding: '20px',
                    backgroundColor: 'white',
                    marginTop: '20px',
                }}
            >
                <div style={{ backgroundColor: '#f6f8fc', padding: '5px', overflow: 'auto' }}>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th rowspan="1">Bill Number</th>
                                <th rowspan="3">Full Name</th>
                                <th rowspan="3">Contact Number</th>
                                <th rowspan="4">Aadhar Number</th>
                                <th rowspan="4">Pan Number</th>
                                <th rowspan="4">Gala</th>
                                <th rowspan="4">Permit Type</th>
                                <th rowspan="4">Rate</th>
                                <th rowspan="4">From Date</th>
                                <th rowspan="4">To Date</th>
                                <th rowspan="4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customerbill && customerbill.map((e) => (
                                <tr>
                                    <td>{e.BillNumber}</td>
                                    <td>{e.FullName}</td>
                                    <td>{e.ContactNumber}</td>
                                    <td>{e.AadharNumber}</td>
                                    <td>{e.PanNumber}</td>
                                    <td>{e.Gala}</td>
                                    <td>{e.PermitType}</td>
                                    <td>{e.Rate}</td>
                                    <td>{e.FromDate}</td>
                                    <td>{e.ToDate}</td>
                                    <td>
                                        <button className="btn" style={{ backgroundColor: '#f1772e' }}>
                                            <img src="/Edit.png" style={{ width: '15px' }}></img>
                                            <Link style={{ color: 'white', textDecoration: 'none', margin: '8px' }} href={"/Customer/PayPermitBill/" + e.BillNumber}>
                                                Pay Bill
                                            </Link>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>




        </>
    );
};

export default CustomerBill;