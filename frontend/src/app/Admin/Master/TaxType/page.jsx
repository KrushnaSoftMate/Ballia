"use client";
import { Admin } from '@/app/AdminContext/AdminManageMent';
import React, { useContext, useEffect, useRef, useState } from 'react'

const TaxType = () => {

    const statecalls = useContext(Admin);
    const { TaxType, AddTaxTypes, DeleteTaxType } = statecalls;
    const [tax, setTax] = useState({
        TaxName: "", id: ""
    })
    const [taxtype, setTaxTypes] = useState([])
    const [searchtax, SetSearchTax] = useState([])
    const customernum = useRef();
    const formRef = useRef(null);
    const [editingRowId, setEditingRowId] = useState(false);

    useEffect(() => {
        GetTaxType()
    }, [])

    async function GetTaxType(e) {
        const data = await TaxType()
        setTaxTypes(data)
        SetSearchTax(data)
    }


    async function SetTaxType(e) {
        e.preventDefault()
        if (tax.TaxName == "") {
            return alert("Not inserted Taxname !!!");
        } else {
            AddTaxTypes(tax, "insert")
            alert("Tax Added Successfully")
            formRef.current.reset();
            setTax([]);
            GetTaxType()
        }
    }

    async function UpdateTax(e) {
        e.preventDefault();

        try {
            await AddTaxTypes(tax, "update");
            alert("Tax Updated Successfully");
            await GetTaxType();
            window.location.reload(); // Use this only if absolutely necessary
        } catch (error) {
            console.error("Error updating tax:", error);
            alert("Failed to update tax. Please try again.");
        }
    }

    async function DeleteTax(e, id) {
        e.preventDefault()
        DeleteTaxType(id)
        alert("Tax Deleted Successfully")
        GetTaxType()
    }

    function handleReset() {
        formRef.current.reset();
        setTax([]);
    }

    const SearchTax = (e) => {
        let searchValue = e.target.value.toLowerCase();
        if (!searchValue) {
            setTaxTypes(searchtax)
            return;
        }
        let newData = searchtax.filter((item) => {
            return (
                item.TaxName.toLowerCase().includes(searchValue)
            )
        });
        setTaxTypes(newData)
    }

    return (
        <>
            <div style={{ backgroundColor: '#f5f7fe', }}>
                <h3 style={{ padding: '20px' }}>Master : Tax Type</h3>
                <div className='mt-3' style={{ width: '60vw', height: '30vh', margin: '30px 90px', borderRadius: '15px', backgroundColor: 'white' }}>
                    <form ref={formRef} onSubmit={SetTaxType} style={{ display: "grid", padding: "50px" }}>
                        <label style={{ fontWeight: 'bold' }} className='form-label'>Tax Name</label>
                        <input placeholder='Enter Tax Name' className='form-control mb-3' type='text' id='TaxName' onChange={(e) => setTax({ ...tax, [e.target.id]: e.target.value })} ref={customernum} />
                        <div class="d-grid gap-2 d-md-flex justify-content-md-center my-3">
                            <button style={{ backgroundColor: '#e5e5e5', borderRadius: '12px' }} class="btn me-md-2" type="button" onClick={handleReset}>Clear</button>
                            <button style={{ backgroundColor: '#f1772e', color: 'white', borderRadius: '12px' }} class="btn" type="submit">Add Tax Type</button>
                        </div>
                    </form>
                </div>

                <div className="mt-5" style={{ display: 'flex', justifyContent: 'space-around', padding: '15px 30px' }}>
                    <h3>Tax Lists</h3>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: '10px',
                            backgroundColor: 'white',
                            position: 'relative',
                            background: 'transparent',
                            marginRight: '10px',
                        }}
                    >
                        <img
                            src="/Search1.png"
                            alt="Search"
                            style={{
                                position: 'absolute',
                                left: '4%',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                            }}
                        />
                        <input
                            className="form-control"
                            type="search"
                            style={{ padding: '9px 40px', border: 'none', borderRadius: '10px' }}
                            placeholder="Search"
                            onChange={(e) => { SearchTax(e) }}
                        />
                    </div>
                </div>
                <div style={{ width: '70vw', height: '90vh', margin: '30px 45px', backgroundColor: 'white', borderRadius: '15px', textAlign: 'center' }}>
                    <div style={{ padding: "20px" }}>
                        <table className='my-2 table table-bordered'>
                            <thead className='table-light'>
                                <tr>
                                    <th>ID</th>
                                    <th>Tax Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    taxtype && taxtype?.map((e, i) => {
                                        if (editingRowId === e.id) {
                                            return (
                                                <tr>
                                                    <td>
                                                        <input placeholder={e.id} className='form-control' disabled onChange={(e) => setTax({ ...tax, [e.target.id]: e.target.value })} id='id' />
                                                    </td>
                                                    <td>
                                                        <input placeholder={e.TaxName} className='form-control' id='TaxName' type='text' onChange={(e) => setTax({ ...tax, [e.target.id]: e.target.value })} />
                                                    </td>
                                                    <td>
                                                        <button className='btn btn-danger mx-3' onClick={(x) => { setEditingRowId(false); }}>Close</button>
                                                        <button className='btn btn-success' onClick={(x) => { setEditingRowId(false); UpdateTax(x); }}>Update</button></td>
                                                </tr>
                                            )
                                        } else {
                                            return (
                                                <>
                                                    <tr>
                                                        <td style={{ fontWeight: 'bolder' }} aria-disabled>{i + 1}</td>
                                                        <td style={{ fontWeight: 'bolder' }}>{e.TaxName}</td>
                                                        <td><button className='btn btn-primary mx-3' onClick={(x) => { setEditingRowId(e.id); setTax(e) }}>Edit</button><button className='btn btn-danger' onClick={(x) => DeleteTax(x, e.id)}>Delete</button></td>
                                                    </tr>
                                                </>
                                            )
                                        }
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaxType