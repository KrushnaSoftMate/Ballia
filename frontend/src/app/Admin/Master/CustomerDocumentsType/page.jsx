"use client";
import { Admin } from '@/app/AdminContext/AdminManageMent';
import React, { useContext, useEffect, useRef, useState } from 'react';
import "./Customerfdoc.css";

const DocumentsType = () => {

    const statecalls = useContext(Admin);
    const { DocumentsType, AddDocumentsType, DeleteDocumentTypes } = statecalls;
    const [documentstype, setDocumentsType] = useState([])
    const [searchdocument, SetSearchDocument] = useState([])
    const [loader, setLoader] = useState(true)
    const [documents, setDocuments] = useState({
        Doc_id: "",
        DocumentName: "",
        Document_Requirment: "",
        type: ""
    })
    const [editingRowId, setEditingRowId] = useState(false);
    const customernum = useRef()
    const formref = useRef(null)

    useEffect((e) => {
        GetDocumentsType()
    }, [])

    async function GetDocumentsType(e) {
        const data = await DocumentsType()
        setDocumentsType(data)
        SetSearchDocument(data)
    }

    async function SetDocumentsType(e) {
        e.preventDefault()
        let obj = {
            ...documents,
            type: "insert"
        }
        const data = await AddDocumentsType(obj)
        if (data) {
            formref.current.reset()
            setDocuments([])
            alert("Document Type Inserted Successfully !!!")
        }
        GetDocumentsType()
    }

    async function UpdateDocumentsType(e) {
        setLoader(false)
        e.preventDefault()
        let obj = {
            ...documents,
            type: "update"
        }
        const data = await AddDocumentsType(obj)
        setLoader(true)
        if (data) {
            alert("Document Updated Successfully")
            GetDocumentsType()
        }
    }

    async function DeleteDocumentType(e, id) {
        e.preventDefault()
        DeleteDocumentTypes(id)
        alert("Document  Deleted Successfully")
        GetDocumentsType()
    }

    const handleChange = (e) => {
        setDocuments({
            ...documents,
            [e.target.name]: e.target.value,
        });
    };

    const handleReset = () => {
        formref.current.reset()
        setDocuments([])
    };

    const SearchDocument = (e) => {
        let searchValue = e.target.value.toLowerCase();

        if (!searchValue) {
            setDocumentsType(searchdocument)
            return;
        }

        let newData = searchdocument.filter((item) => {
            return (
                item.Doc_id.toLowerCase().includes(searchValue) ||
                item.DocumentName.toLowerCase().includes(searchValue)
            )
        });
        setDocumentsType(newData)
    }

    return (
        <>
            <div style={{ height: '140vh', backgroundColor: '#f5f7fe' }}>
                <h3 style={{ padding: '20px' }}>Master:Customer Documents Type</h3>
                <div className='mt-3' style={{ margin: '30px 90px', width: '60vw', height: '60vh', borderRadius: '15px', backgroundColor: 'white' }}>
                    <form ref={formref} onSubmit={SetDocumentsType} style={{ display: "grid", padding: "50px" }}>
                        <label style={{ fontWeight: 'bold' }} className='form-label'>Document ID</label>
                        <input placeholder='Enter Document ID' className='form-control mb-3' type='text' name='Doc_id' onChange={(e) => { handleChange(e) }} ref={customernum} required />
                        <label style={{ fontWeight: 'bold' }} className='form-label'>Document Name</label>
                        <input placeholder='Enter Document Name' className='form-control mb-3' type='text' name='DocumentName' onChange={(e) => { handleChange(e) }} ref={customernum} required />
                        <label style={{ fontWeight: 'bold' }} className='form-label'>Document Requirement</label>
                        <input placeholder='Enter Document Requirment' className='form-control mb-3' type='text' name='Document_Requirment' onChange={(e) => { handleChange(e) }} ref={customernum} required />
                        <div class="d-grid gap-2 d-md-flex justify-content-md-center my-3">
                            <button style={{ backgroundColor: '#e5e5e5', borderRadius: '12px' }} class="btn me-md-2" type="button" onClick={handleReset}>Clear</button>
                            <button style={{ backgroundColor: '#f1772e', color: 'white', borderRadius: '12px' }} class="btn" type="submit">Add Document Type</button>
                        </div>
                    </form>
                </div>



                <div className='CustomerDocumentContrainer' style={{ width: '70vw', height: '30vh', backgroundColor: 'white', borderRadius: '15px', margin: '25px 60px' }}>

                    <div className="mt-5 col-12" style={{ padding: '15px 30px' }}>
                        <div className="row">
                            <div className="col-6">
                                <h3>Documents Lists</h3>
                            </div>
                            <div className='col-6'
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    borderRadius: '10px',
                                    backgroundColor: 'white',
                                    position: 'relative',
                                    background: 'transparent',

                                }}
                            >
                                <img
                                    src="/Search1.png"
                                    alt="Search"
                                    style={{
                                        cursor: 'pointer',
                                        position: "absolute",
                                        top: "11px",
                                        left: "20px"
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
                    </div>
                    <div style={{ padding: "20px" }} className='tableConatiner text-center'>
                        <table className="my-2 col-12">
                            <thead>
                                <tr>
                                    <th style={{ width: "5%" }}>ID</th>
                                    <th style={{ width: "13%" }}>Document ID</th>
                                    <th style={{ width: "27%", textAlign: "left" }}>Document Name</th>
                                    <th style={{ width: "15%" }}>Document Requirment</th>
                                    <th style={{ width: "29%" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loader && documentstype && documentstype.map((e, index) => {
                                        if (editingRowId === e.id) {
                                            return (
                                                <tr>
                                                    <td>
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        <input className='form-control' name='Doc_id' type='text' onChange={(e) => { handleChange(e) }} placeholder={e.Doc_id} />
                                                    </td>
                                                    <td >
                                                        <input className='form-control' name='DocumentName' type='text' onChange={(e) => { handleChange(e) }} placeholder={e.DocumentName} />
                                                    </td>
                                                    <td>
                                                        <input className='form-control' name='Document_Requirment' type='text' onChange={(e) => { handleChange(e) }} placeholder={e.Document_Requirment} />
                                                    </td>
                                                    <td>
                                                        <button className='btn btn-danger mx-3' onClick={(x) => { setEditingRowId(false); }}>Close</button>
                                                        <button className='btn btn-success' onClick={(x) => { setEditingRowId(false); UpdateDocumentsType(x); }}>Update</button>
                                                    </td>
                                                </tr>
                                            )
                                        } else {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{e.Doc_id}</td>
                                                        <td className='text-start'>{e.DocumentName}</td>
                                                        <td>{e.Document_Requirment}</td>
                                                        <td><button className='btn btn-warning mx-3' onClick={(x) => { setEditingRowId(e.id); setDocuments(e) }}>Edit</button>
                                                            <button className='btn btn-danger' onClick={(x) => DeleteDocumentType(x, e.id)}>Delete</button></td>
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

export default DocumentsType