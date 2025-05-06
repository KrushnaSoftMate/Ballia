'use client'
import { Admin } from '@/app/AdminContext/AdminManageMent';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Pagination from '@/Components/pagination'

const TypeofPermit = () => {
    const statecalls = useContext(Admin);
    const { GetPermitTypes, AddPermitTypes, DisablePermitType } = statecalls;
    const formRef = useRef(null);
    const [searchpermittype, Setsearchpermittype] = useState()
    const [permittypes, addPermitTypes] = useState()
    const [permitType, setPermitType] = useState({
        PermitTypes: "",
        Rate: "",
        DueAmount: "",
        Status: "",
        DocumentRequired: "",
        location:""
    })
    const [hidden, SetHidden] = useState('')

    useEffect((e) => {
        GetPermitType()
    }, [])

    async function GetPermitType(e) {
        const data = await GetPermitTypes()
        console.log(data);
        addPermitTypes(data)
        Setsearchpermittype(data)
    }

    async function SetPermitType(e) {
        e.preventDefault()
        const data = await AddPermitTypes(permitType)
        if (data) {
            formRef.current.reset();
            setPermitType([]);
            alert("Added Data Succesfully")
            GetPermitType()
        }
        GetPermitType()

    }

    async function disablePermitType(id, newStatus) {
        const data = await DisablePermitType(id, newStatus)
        alert("Data Updated Succesfully")
        GetPermitType()
    }

    const handleReset = () => {
        formRef.current.reset();
        setPermitType([]);
    };

    const SearchPermitType = (e) => {
        let searchValue = e.target.value.toLowerCase();
        console.log('Search Value:', searchValue);  
    
        if (!searchValue) {
            console.log('Resetting to original data');
            addPermitTypes(searchpermittype);
            return;
        }
    
        console.log('Original Data:', searchpermittype);
    
        let newData = searchpermittype.filter((item) => {
            if (!item || !item.PermitTypes) {
                console.warn('Skipping item due to missing PermitTypes:', item);
                return false;
            }
            console.log('Comparing:', item.PermitTypes.toLowerCase(), 'with', searchValue);
            return item.PermitTypes.toLowerCase().includes(searchValue);
        });
    
        console.log('Filtered Data:', newData);
        addPermitTypes(newData);
    };
    async function getlocation(e) {
        if (typeof navigator != undefined) {
            navigator.geolocation.getCurrentPosition((x) => {
                let lat = x.coords.latitude
                let long = x.coords.longitude
                let val = lat + '/' + long
                setPermitType({
                    ...permitType,
                    ['location']: val,
                });
            })
        } else {
            alert('not available')
        }

    }
    function showtable(e) {
        return (
            <tr>
                <td>{e.id}</td>
                <td>{e.PermitTypes}</td>
                <td>{e.Rate}</td>
                <td>{e.DueAmount}</td>
                <td>{e.Status}</td>
                <td>{e.DocumentRequired}</td>
                <td>{e.location}</td>
                <td><button type='button' onClick={() => {
                    // Toggle the status between 'Enable' and 'Disable'
                    const newStatus = e.Status === 'Enable' ? 'Disable' : 'Enable';
                    // Call disablePermitType function with the updated status
                    disablePermitType(e.id, newStatus);
                }} className='btn btn-warning'>{e.Status == 'Enable' ? 'Disable' : 'Enable'}</button></td>
            </tr>
        )
    }
    return (
        <div className="" style={{ backgroundColor: '#f5f7fe' }}>
            <h3 style={{ padding: '20px' }}>Master:Types Of Permit</h3>
            <div className='mt-3' style={{ width: '70rem', margin: '30px 60px', borderRadius: '15px', backgroundColor: 'white' }}>
                <form ref={formRef} onSubmit={SetPermitType} style={{ display: 'flex', width: '100%', flexWrap: "wrap", padding: '3%', borderRadius: '20px', backgroundColor: 'white', marginTop: '10px' }}>
                    <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                        <label style={{ fontWeight: 'bold' }} className='form-label'>Permit Type</label>
                        <input placeholder='Enter Permit Type' className='form-control mb-3' id='PermitTypes' type='text' onChange={(e) => setPermitType({ ...permitType, [e.target.id]: e.target.value })} required />
                    </div>
                    <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                        <label style={{ fontWeight: 'bold' }} className='form-label'>Rate</label>
                        <input placeholder='Enter Rate' className='form-control mb-3' id='Rate' type='text' onChange={(e) => setPermitType({ ...permitType, [e.target.id]: e.target.value })} required />
                    </div>
                    <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                        <label style={{ fontWeight: 'bold' }} className='form-label'>Late Fees</label>
                        <input placeholder='Enter Late Fees' className='form-control mb-3' id='DueAmount' type='text' onChange={(e) => setPermitType({ ...permitType, [e.target.id]: e.target.value })} required />
                    </div>
                    <div className="mx-2" style={{ width: '45%', padding: '8px' }} ><label style={{ fontWeight: 'bold' }} className='form-label'>Status</label>
                        <select className="form-select mb-3" id="Status" onChange={(e) => setPermitType({ ...permitType, [e.target.id]: e.target.value })} required>
                            <option disabled selected>Select</option>
                            <option className="form-control"  >Enable</option>
                            <option className="form-control"  >Disable</option>
                        </select>
                    </div>
                    <div className="mx-2" style={{ width: '45%', padding: '8px' }} >  <label style={{ fontWeight: 'bold' }} className='form-label'>Document Required</label>
                        <input placeholder='Required Documents' className='form-control mb-3' id='DocumentRequired' type='text' onChange={(e) => setPermitType({ ...permitType, [e.target.id]: e.target.value })} required />

                    </div>
                    <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                        <label style={{ fontWeight: 'bold' }}>Location</label><br />
                        <div style={{ display: 'flex', height: '40px', fontSize: '20px' }}>
                            <button style={{ fontSize: '13px', width: '10rem' }} type="button" className="btn btn-primary" onClick={(e) => { getlocation(e) }}>Get Location</button>
                            <input className="form-control " type="text" name="location" value={permitType.location}/>
                        </div>
                    </div>                        
                    <div className="col-11 mt-3" style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <button style={{ backgroundColor: '#e5e5e5', borderRadius: '12px' }} class="btn me-md-2" type="button" onClick={handleReset}>Clear</button>
                        <button style={{ backgroundColor: '#f1772e', color: 'white', borderRadius: '12px' }} class="btn" type="submit">Add Permit Type</button>
                    </div>
                </form>
            </div>

            <div className="mt-5" style={{ display: 'flex', justifyContent: 'space-around', padding: '15px 30px' }}>
                <h3>Permit Type Lists</h3>
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
                        onChange={(e) => { SearchPermitType(e) }}
                    />
                </div>
            </div>

            <div style={{ width: '70vw', backgroundColor: 'white', borderRadius: '15px', margin: '25px 45px', textAlign: 'center' }}>
                <div style={{ padding: "20px" }}>
                    <table className='my-2 table table-bordered'>
                        <thead className='table-light'>
                            <tr>
                                <th>ID</th>
                                <th>Permit Type</th>
                                <th>Rate</th>
                                <th>Late Fees</th>
                                <th>Status</th>
                                <th>Document required</th>
                                <th>Location</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {permittypes && <Pagination data={permittypes} func={showtable} perPageItems={5} searchparam={['PermitTypes', 'Status']} searchword={searchpermittype} />}

                        </tbody>
                    </table>
                </div>
                <nav aria-label="Page navigation example" style={{ display: 'flex', justifyContent: 'end' }}>
                    <ul className="pagination" style={{ marginTop: '22px' }}>
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
    )
}

export default TypeofPermit