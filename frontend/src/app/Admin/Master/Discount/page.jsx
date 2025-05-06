"use client";
import { Admin } from '@/app/AdminContext/AdminManageMent';
import React, { useContext, useEffect, useRef, useState } from 'react'

const Page = () => {

    const statecalls = useContext(Admin);
    const { DiscountType, AddDiscountType ,DeleteDiscountType} = statecalls;
    const [discounttype, setDiscountType] = useState([])
    const [searchdiscount, SetSearchdiscount] = useState([])
    const [loader, setLoader] = useState(true)
    const [discounts, setDiscounts] = useState({
        DiscountFor: "",
        Percent: "",
        Status: "",
        type: ""
    })
    const [editingRowId, setEditingRowId] = useState(false);
    const customernum = useRef()
    const formref = useRef(null)

    useEffect((e) => {
        GetDocumentsType()
    }, [loader])

    async function GetDocumentsType(e) {
        const data = await DiscountType()
        setDiscountType(data)
        SetSearchdiscount(data)
    }

    async function SetDocumentsType(e) {
        e.preventDefault()
        let obj = {
            ...discounts,
            type: "insert"
        }
        const data = await AddDiscountType(obj)
        if (data) {
            formref.current.reset()
            setDiscounts([])
            alert("Inserted Successfully")
        }
        GetDocumentsType()
    }

    async function UpdateDocumentsType(e) {
        setLoader(false)
        e.preventDefault()
        let obj = {
            ...discounts,
            type: "update"
        }
        const data = await AddDiscountType(obj)
        setLoader(true)
    }

    const handleChange = (e) => {
        setDiscounts({
            ...discounts,
            [e.target.name]: e.target.value,
        });
    };

    const handleReset = () => {
        formref.current.reset()
        setDiscounts([])
    };

    const SearchDocument = (e) => {
        let searchValue = e.target.value.toLowerCase();

        if (!searchValue) {
            setDiscountType(searchdiscount)
            return;
        }

        let newData = searchdiscount.filter((item) => {
            return (
                item.Doc_id.toLowerCase().includes(searchValue) ||
                item.DocumentName.toLowerCase().includes(searchValue)
            )
        });
        setDiscountType(newData)
    }

    const DeleteDiscountType1=(e)=>{
        const data =  DeleteDiscountType(e)
        GetDocumentsType()
    }

    return (
        <>
            <div style={{ height: '140vh', backgroundColor: '#f5f7fe' }}>
                <h3 style={{ padding: '20px' }}>Master:Discount Type</h3>
                <div className='mt-3' style={{ margin: '30px 90px', width: '60vw', height: '65vh', borderRadius: '15px', backgroundColor: 'white' }}>
                    <form ref={formref} onSubmit={SetDocumentsType} style={{ display: "grid", padding: "50px" }}>
                        <label style={{ fontWeight: 'bold' }} className='form-label'>Discount For</label>
                        <input placeholder='Enter Discount Name' className='form-control mb-3' type='text' name='DiscountFor' onChange={(e) => { handleChange(e) }} ref={customernum} />
                        <label style={{ fontWeight: 'bold' }} className='form-label'>Percent
                        </label>
                        <input placeholder='Enter Percentage' className='form-control mb-3' type='number' name='Percent' onChange={(e) => { handleChange(e) }} ref={customernum} pattern='^([-+,0-9.]+) ' />
                        <label style={{ fontWeight: 'bold' }} className='form-label'>Status
                        </label>
                        <select className="form-select" style={{ width: '50vw' }} name="Status" onChange={(e) => { handleChange(e) }}>
                            <option disabled selected>Select</option>
                            <option className="form-control"  >Active</option>
                            <option className="form-control"  >Deactive</option>
                        </select>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-center my-3">
                            <button style={{ backgroundColor: '#e5e5e5', borderRadius: '12px' }} class="btn me-md-2" type="button" onClick={handleReset}>Clear</button>
                            <button style={{ backgroundColor: '#f1772e', color: 'white', borderRadius: '12px' }} class="btn" type="submit">Add Discount</button>
                        </div>
                    </form>
                </div>

                <div className="mt-5" style={{ display: 'flex', justifyContent: 'space-around', padding: '15px 30px' }}>
                    <h3>Documents Lists</h3>
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
                            onChange={(e) => { SearchDocument(e) }}
                        />
                    </div>
                </div>

                <div style={{ width: '70vw', height: '30vh', backgroundColor: 'white', borderRadius: '15px', margin: '25px 60px', textAlign: 'center' }}>
                    <div style={{ padding: "20px" }}>
                        <table className="my-2 table table-bordered">
                            <thead className='table-light'>
                                <tr>
                                    <th>ID</th>
                                    <th>DiscountFor</th>
                                    <th>Percent</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loader && discounttype && discounttype.map((e) => {
                                        if (editingRowId===e.id) {
                                            return (
                                                <tr>
                                                    <td>
                                                        {e.id}
                                                    </td>
                                                    <td>
                                                        <input className='form-control' name='DiscountFor' type='text' onChange={(e) => { handleChange(e) }} placeholder={e.DiscountFor} disabled />
                                                    </td>
                                                    <td>
                                                        <input className='form-control' name='Percent' type='number' onChange={(e) => { handleChange(e) }} placeholder={e.Percent} />
                                                    </td>
                                                    <td>
                                                        <select  className="form-select" name="Status" onChange={(e) => { handleChange(e) }}>
                                                            <option disabled >Select</option>
                                                            <option selected={e.Status=="Active"?true:false}  className="form-control">Active</option>
                                                            <option selected={e.Status=="Deactive"?true:false} className="form-control">Deactive</option>
                                                        </select>
                                                    </td>

                                                    <td>
                                                        <button className='btn btn-danger mx-3' onClick={(x) => { setEditingRowId(false); }}>Close</button>
                                                        <button className='btn btn-success' onClick={(x) => { setEditingRowId(false); UpdateDocumentsType(x); }}>Update</button></td>
                                                </tr>
                                            )
                                        } else {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{e.id}</td>
                                                        <td>{e.DiscountFor}</td>
                                                        <td>{e.Percent}</td>
                                                        <td>{e.Status}</td>
                                                        <td><button className='btn btn-primary mx-1' onClick={(x) => { setEditingRowId(e.id); setDiscounts(e) }}>Edit</button>
                                                        <button className='btn btn-danger my-1' onClick={(x) => DeleteDiscountType1(e)}>Delete</button></td>
                                                    </tr>
                                                </>
                                            )
                                        }

                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                    <nav aria-label="Page navigation example" style={{ display: 'flex', justifyContent: 'end' }}>
                        <ul className="pagination" style={{ marginTop: '10px' }}>
                            <li className="page-item">
                                <a
                                    className="page-link"
                                    href="#"
                                    style={{
                                        color: '#757575',
                                        borderColor: '#757575',
                                        borderRadius: '50px',
                                        marginRight: '10px',
                                    }}
                                >
                                    &laquo; Previous
                                </a>
                            </li>
                            <li className="page-item active mx-3">
                                <a
                                    className="page-link"
                                    href="#"
                                    style={{
                                        color: '#f1772e',
                                        border: 'none',
                                        backgroundColor: '#face25',
                                        borderRadius: '50%',
                                        marginRight: '10px',
                                    }}
                                >
                                    1
                                </a>
                            </li>
                            <li className="page-item">
                                <a
                                    className="page-link"
                                    href="#"
                                    style={{
                                        color: '#f1772e',
                                        borderColor: '#f1772e',
                                        borderRadius: '50px',
                                    }}
                                >
                                    Next &raquo;
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Page