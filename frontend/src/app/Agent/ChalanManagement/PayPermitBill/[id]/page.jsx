'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Agent } from '@/app/AdminContext/AgentManagement'
import Link from 'next/link';
import { Router } from 'next/router';
import { HASHKEY,ENV } from '@/app/paths';


const page = ({ params }) => {

    const statecalls = useContext(Agent);
    const formRef = useRef(null);
    const resetnum = useRef();
    const { GetPermitBill, TokenPayment, TokenPaymentSuccess, CashPayBill } = statecalls;
    const [renderdata, setRenderData] = useState({});
    const [billdata, setBillData] = useState({
        PaymentAmountRate: "",
        FullName: "",
        Email: "",
        ContactNumber: "",
        PaymentMode: "",
        BillNumber: params.id
    });
    useEffect(() => {
        getBill();
        return () => { };
    }, []);

    const getBill = async () => {
        const data = await GetPermitBill(params.id);
        setRenderData(data[0]);
    };

    async function PayBill(e) {
        e.preventDefault()
        const data = await TokenPayment(billdata)
        const token = data.data
        var easebuzzCheckout = new EasebuzzCheckout(HASHKEY,ENV) // for test enviroment pass "test"
        var options = {
            access_key: token, // access key received via Initiate Payment
            onResponse: (response) => {
                const obj = {
                    ...response,
                    ...billdata,
                    ...renderdata
                }
                alert(response.status)
                TokenPaymentSuccess(obj)
                if (response.status === "success") {
                    alert('Payment Success full');
                    // window.location.href = `/Reciept/${params.id}`;
                    const link = document.getElementById('abc');
                    link.href = `/Reciept/${params.id}`;
                    link.click();
                
                }
            },
            theme: "#123456" // color hex
        }
        easebuzzCheckout.initiatePayment(options);
    }

    async function CashPay(e) {
        e.preventDefault()
        const obj = {
            ...billdata,
            ...renderdata
        }
        const data = await CashPayBill(obj)
        if (data) {
            alert('Collect the cash')
            // window.location.href = `/Reciept/${params.id}`
            const link = document.getElementById('abc');
            link.href = `/Reciept/${params.id}`;
            link.click();
        }
        else {
            alert('Connot Collect Cash')
        }
    }

    function handleReset() {
        formRef.current.reset();
        setBillData({});
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", }}>
                <form ref={formRef} onSubmit={(e) => billdata.PaymentMode == 'Online' ? PayBill(e) : CashPay(e)}>
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
                                    placeholder="Enater Email"
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
                                <select style={{ width: '20rem' }} className="form-control" id='PaymentMode' value={billdata.PaymentMode} onChange={(e) => { setBillData({ ...billdata, [e.currentTarget.id]: e.currentTarget.value, }); }} required>
                                    <option value="" disabled>Select Payment Mode</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Online">Online</option>
                                </select>
                            </div>
                            <div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", marginTop: '15px' }}>
                                <button style={{ background: 'linear-gradient(180deg, rgba(247,168,7,1) 63%, rgba(225 31 31) 79%)', color: "white", fontWeight: "bold" }} type="submit" className="btn my-2">Pay Now</button>
                                <button type="button" onClick={handleReset} style={{ backgroundColor: 'tranparent', color: "white", fontWeight: "bold" }} className="my-2 mx-2 btn  btn-primary">Clear</button>
                            </div>
                            <a href="" id='abc' target='_blank' hidden></a>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default page
