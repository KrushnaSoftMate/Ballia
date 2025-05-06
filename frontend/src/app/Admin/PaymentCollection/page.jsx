'use client'
import React, { useContext, useRef, useState } from 'react'

import { Admin } from '@/app/AdminContext/AdminManageMent'
import Link from 'next/link'

const page = () => {

    const { GetBills } = useContext(Admin)
    const formRef = useRef(null);
    const propertyid = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [customerbill, SetCustomerBill] = useState([])

    async function GetBill(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const trimmedPropertyId = propertyid.current.value?.trim(); // Trim white spaces
            console.log("trimmedPropertyId", trimmedPropertyId);

            let data = await GetBills(trimmedPropertyId)
            console.log(data.customer);
            SetCustomerBill(data.customer[0]);
        } catch (error) {
            console.error("Error fetching bill:", error);
        } finally {
            setIsLoading(false);
        }
    }

    function handleReset() {
        formRef.current.reset();
    }

    return (
        <>

            <div>

                <div>
                    <div style={{ display: 'flex', padding: "1rem 2rem" }}>
                        <h5><b>Pay Bill</b></h5>

                    </div>
                    <div
                        style={{
                            display: 'grid',
                            border: '2px solid',
                            borderRadius: '20px',
                            border: 'none',
                            padding: '30px',
                            backgroundColor: 'white',
                        }}
                    >
                        <form ref={formRef} onSubmit={GetBill}>
                            <div
                                className="col"
                                style={{
                                    border: '1px solid #f1772e',
                                    backgroundColor: 'lightyellow',
                                    padding: '20px 0px',
                                    borderRadius: '10px'
                                }}
                            >
                                <div className="col" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <h5 htmlFor="NI_Type" className="form-label " style={{ textAlign: 'center', padding: '8px 0px', fontSize: '15px' }}>
                                        <b>Pay Bill</b>
                                    </h5>
                                    <input
                                        type="text"
                                        ref={propertyid}
                                        className="col-sm-4"
                                        style={{
                                            padding: '5px',
                                            borderRadius: '10px',
                                            borderColor: 'rgb(212, 212, 212)',
                                        }}
                                        required
                                        placeholder="Enter Customer Property ID"
                                    ></input>
                                    <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                        <div style={{ position: 'relative', display: 'flex', paddingRight: "8px" }}>
                                            <img
                                                src="/Search.png"
                                                alt="Search"
                                                style={{
                                                    width: '15px',
                                                    position: 'absolute',
                                                    top: '30%',
                                                    left: "5%",
                                                    cursor: 'pointer',
                                                }}
                                            />
                                            <button type="submit"
                                                style={{
                                                    backgroundImage: '/loginimage.png',
                                                    height: "2.5rem",
                                                    width: '11rem',
                                                    color: 'white',
                                                    backgroundColor: '#f1772e',
                                                    border: 'none',
                                                    borderRadius: '10px',
                                                }}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? 'Loading...' : 'Find Bill'}
                                            </button>
                                        </div>
                                        <div style={{ width: '10rem' }}>
                                            <button
                                                type="button"
                                                onClick={handleReset}
                                                className="btn btn-primary form-control"
                                                style={{
                                                    backgroundColor: '#e5e5e5',
                                                    height: "2.5rem",
                                                    width: '5rem',
                                                    color: '#757575',
                                                    border: 'none',
                                                    borderRadius: '10px',
                                                }}
                                            >
                                                Reset
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div
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
                                        <th rowspan="4">Area</th>
                                        <th rowspan="4">Total Amount</th>
                                        <th rowspan="4">Remaining Amount</th>
                                        <th rowspan="4">From Date</th>
                                        <th rowspan="4">To Date</th>
                                        <th rowspan="4">Action</th>
                                    </tr>
                                </thead>



                                {
                                    customerbill?.PropertyID ?
                                        <tbody>

                                            <tr>
                                                <td>{customerbill.PropertyID}</td>
                                                <td>{customerbill.FullName}</td>
                                                <td>{customerbill.ContactNumber}</td>
                                                <td>{customerbill.AadharNumber}</td>
                                                <td>{customerbill.PanNumber}</td>
                                                <td>{customerbill.Area}</td>
                                                <td>{customerbill.Amount}</td>
                                                <td>{customerbill.Remaining}</td>
                                                <td>{customerbill.FromDate}</td>
                                                <td>{customerbill.ToDate}</td>
                                                <td>
                                                    <Link style={{ color: 'white', textDecoration: 'none', margin: '8px' }} href={"PaymentCollection/" + customerbill.PropertyID}>

                                                        {
                                                            customerbill.Remaining !== 0 ?
                                                                (
                                                                    <button className="btn" style={{ backgroundColor: '#f1772e', width: '6rem' }}>
                                                                        <img src="/Edit.png" style={{ width: '15px', marginRight: '5px' }}></img>
                                                                        Pay Bill
                                                                    </button>
                                                                )
                                                                :
                                                                (
                                                                    <p className='text-success'>Already Paid</p>
                                                                )

                                                        }
                                                    </Link>
                                                </td>
                                            </tr>

                                        </tbody>
                                        : ""}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page
