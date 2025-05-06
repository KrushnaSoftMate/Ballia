"use client";
import { Admin } from '@/app/AdminContext/AdminManageMent';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Pagination from '@/Components/pagination';
import "./propertyTypes.css";

const PropertyTypes = () => {

    const statecalls = useContext(Admin);
    const { PropertyTypes, AddPropertyTypes, DeletePropertyType } = statecalls;
    const [property, setProperty] = useState({
        PropertyType: "",
        id: "",
        Rate: ""
    })
    const [propertytypes, setPropertyTypes] = useState([])
    const formRef = useRef(null);
    const customernum = useRef();
    const [editingRowId, setEditingRowId] = useState(false);
    const [searchProperty, SetSearchProperty] = useState([]);


    useEffect((e) => {
        GetPropertyTypes()
    }, [])

    async function GetPropertyTypes(e) {
        try {
            const data = await PropertyTypes()
            setPropertyTypes(data)
            console.log(data);
            SetSearchProperty(data)
        }
        catch (err) {
            console.log(err);
        }
    }

    async function SetPropertyType(e) {
        e.preventDefault()
        AddPropertyTypes(property, "insert")
        formRef.current.reset();
        setProperty({ PropertyType: "", id: "", Rate: "" });
        alert("Tax Added Successfully")
        GetPropertyTypes()
    }

    async function UpdatePropertyType(e) {
        e.preventDefault()
        AddPropertyTypes(property, "update")
        alert("Tax Updated Successfully")
        GetPropertyTypes()
        window.location.reload()
    }

    async function DeleteTax(e, id) {
        e.preventDefault()
        DeletePropertyType(id)
        alert("Tax Deleted Successfully")
        GetPropertyTypes()
        window.location.reload()
    }

    function handleReset() {
        formRef.current.reset();
        setProperty({ PropertyType: "", id: "", Rate: "" });
    }

    const SearchProperty = (e) => {
        let searchValue = e.target.value.toLowerCase();
        if (!searchValue) {
            setPropertyTypes(searchProperty)
            return;
        }
        let newData = searchProperty.filter((item) => {
            return (
                item.PropertyType.toLowerCase().includes(searchValue)
            )
        });
        setPropertyTypes(newData)
    }


    function cards(e, index) {
        const srNo = index + 1;


        if (editingRowId === e.id) {

            return (
                <tr>
                    <td>
                        {srNo}
                    </td>
                    <td className='leftALogn'>
                        <input placeholder={e.id} className='form-control' disabled onChange={(e) => setProperty({ ...property, [e.target.id]: e.target.value })} id='id' />
                    </td>
                    <td className='leftALogn'>
                        <input placeholder={e.PropertyType} className='form-control' id='PropertyType' type='text' onChange={(e) => setProperty({ ...property, [e.target.id]: e.target.value })} />
                    </td>
                    <td>
                        <input placeholder={e.Rate} className='form-control' id='Rate' type='text' onChange={(e) => setProperty({ ...property, [e.target.id]: e.target.value })} />
                    </td>
                    <td>
                        <button className='btn btn-danger mx-3' onClick={(x) => { setEditingRowId(false); }}>Close</button>
                        <button className='btn btn-success' onClick={(x) => { setEditingRowId(false); UpdatePropertyType(x); }}>Update</button></td>
                </tr>
            )
        } else {
            return (
                <>
                    <tr>
                        <td>{srNo}</td>
                        <td className='leftALogn' style={{ fontWeight: 'bolder' }} aria-disabled>{e.id}</td>
                        <td className='leftALogn' style={{ fontWeight: 'bolder' }}>{e.PropertyType}</td>
                        <td style={{ fontWeight: 'bolder' }}>{e.Rate}</td>
                        <td><button className='btn btn-primary mx-3' onClick={(x) => { setEditingRowId(e.id); setProperty(e) }}>Edit</button><button className='btn btn-danger' onClick={(x) => DeleteTax(x, e.id)}>Delete</button></td>
                    </tr>
                </>
            )
        }

    }

    return (
        <>
            <div style={{ height: '100vh', backgroundColor: '#f5f7fe' }}>
                <h3 style={{ padding: '20px' }}>Master : Property for Use</h3>
                <div className='mt-3' style={{ width: '60vw', height: '45vh', margin: '30px 90px', borderRadius: '15px', backgroundColor: 'white' }}>
                    <form ref={formRef} onSubmit={SetPropertyType} style={{ display: "grid", padding: "50px" }}>
                        <label style={{ fontWeight: 'bold' }} className='form-label'>Property Name</label>
                        <input placeholder='Enter Property Name'
                            className='form-control mb-3'
                            type='text'
                            id='PropertyType'
                            ref={customernum}
                            value={property.PropertyType}
                            onChange={(e) => {
                                const value = e.target.value;
                                const filtered = value.replace(/[^a-zA-Z0-9 ]/g, '');
                                setProperty({ ...property, [e.target.id]: filtered });
                            }}

                        />

                        <label style={{ fontWeight: 'bold' }} className='form-label'>Property Rate</label>
                        <input placeholder='Enter Property Rate' className='form-control mb-3' type='text' id='Rate' onChange={(e) => setProperty({ ...property, [e.target.id]: e.target.value })} ref={customernum} />
                        <div class="d-grid gap-2 d-md-flex justify-content-md-center my-3">
                            <button style={{ backgroundColor: '#e5e5e5', borderRadius: '12px' }} class="btn me-md-2" type="button" onClick={handleReset}>Clear</button>
                            <button style={{ backgroundColor: '#f1772e', color: 'white', borderRadius: '12px' }} class="btn" type="submit">Add Property Type</button>
                        </div>
                    </form>
                </div>



                <div className='PropertyContainer my-4 py-4 px-2' style={{ width: '70vw', height: '90vh', margin: '30px 45px', backgroundColor: 'white', borderRadius: '15px' }}>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-6">
                                <h3>Property Lists</h3>

                            </div>


                            <div className="col-6">

                                <div className='col-12 m-auto'
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
                                        onChange={(e) => { SearchProperty(e) }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ padding: "20px" }} className='tableConatiner'>
                        <table className='my-2 col-12 text-center'>
                            <thead >
                                <tr>
                                    <th style={{ width: "2%" }}>Sr.No</th>
                                    <th style={{ width: "15%", textAlign: "left" }}>Property ID</th>
                                    <th style={{ width: "40%", textAlign: "left" }}>Property for use</th>
                                    <th style={{ width: "15%" }}>Rate</th>
                                    <th style={{ width: "35%" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(propertytypes) && propertytypes.length > 0 ? (

                                    <Pagination data={propertytypes} perPageItems={10} func={(c, i) => cards(c, i)} searchparam={["PropertyType"]} searchword={""} useeffectactive={propertytypes} />
                                ) : (
                                    <tr>
                                        <td colSpan="14">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PropertyTypes