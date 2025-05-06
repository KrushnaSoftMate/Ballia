"use client";
import { Admin } from '@/app/AdminContext/AdminManageMent';
import React, { useContext, useEffect, useState, useRef } from 'react'

const LocalityTypes = () => {

    const statecalls = useContext(Admin);
    const { LocalityTypes, AddLocalityTypes } = statecalls;
    const [localitytypes, setLocalityTypes] = useState([])
    const [searchlocality, SetSearchLocality] = useState([])
    const customernum = useRef()
    const formRef = useRef(null);
    const [locality, setLocality] = useState({
        locality: "",
        ward: "",
        zone: ""
    })
    useEffect((e) => {
        GetLocalityTypes()
    }, [])

    async function GetLocalityTypes(e) {
        const data = await LocalityTypes()
        setLocalityTypes(data)
        SetSearchLocality(data)
    }

    async function SetLocalityType(e) {
        e.preventDefault()
        const data = await AddLocalityTypes(locality)
        if (data) {
            formRef.current.reset();
            setLocality([]);
            alert("Document Inserted Successfully")
        }
        setLocality(data)
        GetLocalityTypes()
    }

    function handleReset() {
        formRef.current.reset();
        setLocality([]);
    }

    const SearchLocality = (e) => {
        let searchValue = e.target.value.toLowerCase();

        if (!searchValue) {
            setLocalityTypes(searchlocality)
            return;
        }

        let newData = searchlocality.filter((item) => {
            return (
                item.locality.toLowerCase().includes(searchValue)
            )
        });
        setLocalityTypes(newData)
    }

    return (
        <>
            <div style={{ height: '120vh', backgroundColor: '#f5f7fe', }}>
                <h3 style={{ padding: '20px' }}>Master:Locality Types</h3>
                <div className='mt-3' style={{ width: '60vw', height: '60vh', margin: '30px 90px', borderRadius: '15px', backgroundColor: 'white' }}>
                    <form ref={formRef} onSubmit={SetLocalityType} style={{ display: "grid", padding: "50px" }}>
                        <label style={{ fontWeight: 'bold' }} className='form-label'>Locality</label>
                        <input placeholder='Enter Locality' className='form-control mb-3' type='text' id='locality' onChange={(e) => setLocality({ ...locality, [e.target.id]: e.target.value })} ref={customernum} />
                        <label style={{ fontWeight: 'bold' }} className='form-label'>Ward</label>
                        <input placeholder='Enter Ward' className='form-control mb-3' type='text' id='ward' onChange={(e) => setLocality({ ...locality, [e.target.id]: e.target.value })} ref={customernum} />
                        <label style={{ fontWeight: 'bold' }} className='form-label'>Zone</label>
                        <input placeholder='Enter Zone' className='form-control mb-3' type='text' id='zone' onChange={(e) => setLocality({ ...locality, [e.target.id]: e.target.value })} ref={customernum} />
                        <div class="d-grid gap-2 d-md-flex justify-content-md-center my-3">
                            <button onClick={handleReset} style={{ backgroundColor: '#e5e5e5', borderRadius: '12px' }} class="btn me-md-2" type="button">Clear</button>
                            <button style={{ backgroundColor: '#f1772e', color: 'white', borderRadius: '12px' }} class="btn" type="submit">Add Locality</button>
                        </div>
                    </form>
                </div>

                <div className="mt-5" style={{ display: 'flex', justifyContent: 'space-around', padding: '15px 30px' }}>
                    <h3>Locality Lists</h3>
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
                            onChange={(e) => { SearchLocality(e) }}
                        />
                    </div>
                </div>

                <div style={{ width: '70vw', height: '25vh', margin: '30px 60px', backgroundColor: 'white', borderRadius: '15px', marginTop: '15px', textAlign: 'center' }}>
                    <div style={{ padding: "20px" }}>
                        <table className='my-2 table table-bordered'>
                            <thead className='table-light'>
                                <tr>
                                    <th>ID</th>
                                    <th>Locality</th>
                                    <th>Ward</th>
                                    <th>Zone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    localitytypes && localitytypes.map((e) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{e.id}</td>
                                                    <td>{e.locality}</td>
                                                    <td>{e.ward}</td>
                                                    <td>{e.zone}</td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <nav aria-label="Page navigation example" style={{ display: 'flex', justifyContent: 'end' }}>
                        <ul className="pagination" >
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

export default LocalityTypes