'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Admin } from '@/app/AdminContext/AdminManageMent'
import Link from 'next/link';
import { Router } from 'next/router';
import "@/app/LandingPage/p.css"
const page = ({ params }) => {

    const statecalls = useContext(Admin);
    const formRef = useRef(null);
    const resetnum = useRef();
    const { GetBills, CashPayBill, ApplyDiscount, GetHashCashKey } = statecalls;
    const [renderdata, setRenderData] = useState({});
    const [showhidden, SetShowHidden] = useState(false)
    const [Paymentcollection, SetPaymentcollection] = useState(0)
    const [discountrate, SetDiscountRate] = useState(0)
    const [billdata, setBillData] = useState({
        PaymentAmountRate: "",
        FullName: "",
        Email: "",
        ContactNumber: "",
        PaymentMode: "Cash",
        PropertyID: params.id,
    });

    useEffect(() => {
        getBill();
        return () => { };
    }, []);

    const getBill = async () => {

        const data = await GetBills(params.id);
        console.log(data);
        setRenderData(data.customer[0]);


    };



    async function CashPay(e) {
        console.log("called");
        e.preventDefault()
        const obj = {
            ...billdata,
            ...renderdata
        }
        console.log(obj);
        const data = await CashPayBill(obj)
        console.log(data);
        if (data) {
            alert('Collect the cash')
            SetShowHidden(false)
            window.location.href = `/Reciept/${params.id}`
            const link = document.getElementById('abc');
            link.href = `/Reciept/${params.id}`;
            link.click();
        }
        else {
            alert('Connot Collect Cash')
            SetShowHidden(false)
        }
    }

    function handleReset() {
        formRef.current.reset();
        setBillData({});
    }

    async function Submit(e) {
        e.preventDefault()
        let obj = {
            ...renderdata, ...billdata
        }

        let data = await GetHashCashKey(obj)
        if (data=="No Due Against Customer") {
            return alert("Some Error")
        }
        SetPaymentcollection(data)

        const Discountrate = Number(billdata?.PaymentAmountRate) - Number(data)
        SetDiscountRate(Discountrate)
        SetShowHidden(true)
    }

    return (
        <>
            <div style={{ display: "grid", justifyContent: "center", }}>
                <form ref={formRef} onSubmit={Submit}>
                    <div className="card my-5" style={{ width: "35rem", backgroundColor: "#f2fcf7", textAlign: 'center' }}>
                        <h4 style={{ background: 'linear-gradient(185deg, rgba(133,27,43,1) 36%, rgba(133,27,130,1) 68%)', color: 'white', textAlign: 'center' }}>Pay Bill Form</h4>
                        <div className="card-body">
                            <div style={{ display: "flex", justifyContent: 'space-between', marginTop: '1rem' }}>
                                <label style={{ fontWeight: 'bold' }}>Amount</label>
                                <input
                                    id="PaymentAmountRate"
                                    ref={resetnum}
                                    onChange={(e) => {
                                        setBillData({
                                            ...billdata,
                                            [e.currentTarget.id]: e.currentTarget.value,
                                        });
                                    }}
                                    style={{ width: '20rem' }}
                                    placeholder={renderdata?.Remaining}
                                    className="form-control"
                                    type="number"
                                    required
                                ></input>
                            </div>
                            <div style={{ display: "flex", justifyContent: 'space-between', marginTop: '1rem' }}>
                                <label style={{ fontWeight: 'bold' }}>Name</label>
                                <input
                                    id="FullName"
                                    ref={resetnum}
                                    onChange={(e) => {
                                        setBillData({
                                            ...billdata,
                                            [e.currentTarget.id]: e.currentTarget.value,
                                        });
                                    }}
                                    style={{ width: '20rem' }}
                                    placeholder={renderdata?.FullName}
                                    className="form-control"
                                    type="text"
                                ></input>
                            </div>
                            <div style={{ display: "flex", justifyContent: 'space-between', marginTop: '1rem' }}>
                                <label style={{ fontWeight: 'bold' }}>Email</label>
                                <input
                                    id="Email"
                                    ref={resetnum}
                                    onChange={(e) => {
                                        setBillData({
                                            ...billdata,
                                            [e.currentTarget.id]: e.currentTarget.value,
                                        });
                                    }}
                                    style={{ width: '20rem' }}
                                    placeholder="Enter Email"
                                    className="form-control"
                                    type="email"
                                ></input>
                            </div>
                            <div style={{ display: "flex", justifyContent: 'space-between', marginTop: '1rem' }}>
                                <label style={{ fontWeight: 'bold' }}>Mobile No</label>
                                <input
                                    id="ContactNumber"
                                    ref={resetnum}
                                    onChange={(e) => {
                                        setBillData({
                                            ...billdata,
                                            [e.currentTarget.id]: e.currentTarget.value,
                                        });
                                    }}
                                    style={{ width: '20rem' }}
                                    placeholder={renderdata?.ContactNumber}
                                    className="form-control"
                                    type="number"
                                ></input>
                            </div>
                            <div style={{ display: "flex", justifyContent: 'space-between', marginTop: '1rem' }}>
                                <label style={{ fontWeight: 'bold' }}>Payment Mode</label>

                                <input
                                    id="PaymentMode"
                                    onChange={(e) => {
                                        setBillData({
                                            ...billdata,
                                            [e.currentTarget.id]: e.currentTarget.value,
                                        });
                                    }}
                                    style={{ width: '20rem' }}
                                    value="Cash"
                                    className="form-control"
                                    type="text"
                                    disabled
                                ></input>
                            </div>
                            <div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", marginTop: '15px' }}>
                                <button style={{ background: 'linear-gradient(180deg, rgba(247,168,7,1) 63%, rgba(225 31 31) 79%)', color: "white", fontWeight: "bold" }} type="submit" className="btn my-2">Get Details</button>
                                <button type="button" onClick={handleReset} style={{ backgroundColor: 'tranparent', color: "white", fontWeight: "bold" }} className="my-2 mx-2 btn  btn-primary">Clear</button>
                            </div>
                            <a href="" id='abc' target='_blank' hidden></a>
                        </div>
                    </div>
                </form>

                {showhidden ?
                    <form onSubmit={(e) => CashPay(e)} >
                        <div className="cashpaymentpopup">
                            <div class="card" style={{ width: "18rem" }}>
                                <img src="/UP-Logo.jpg" class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">Cash Payment</h5>
                                   
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Total Amount : {renderdata.Remaining}</li>
                                    <li class="list-group-item">You Pay : {billdata.PaymentAmountRate}</li>
                                    <li class="list-group-item">Discount Applied : {discountrate}</li>
                                    <li class="list-group-item">Total Pay : {Paymentcollection}</li>
                                </ul>
                                <div class="card-body">
                                    <button type='submit' className='btn btn-success'>Pay Now</button>
                                    <button type='submit' className='btn btn-danger' onClick={() => SetShowHidden(false)}>cancel</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    : ""
                }

            </div>
        </>
    )
}

export default page
