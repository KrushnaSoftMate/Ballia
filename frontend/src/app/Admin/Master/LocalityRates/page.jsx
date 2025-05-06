"use client"
import { Admin } from '@/app/AdminContext/AdminManageMent';
import Dropdown from '@/Components/Dropdown';
import Pagination from '@/Components/pagination';
import Popup from '@/Components/Popup';
import React, { useContext, useEffect, useRef, useState, useCallback, useMemo } from 'react'

const LocalityRatesPage = () => {

    const statecalls = useContext(Admin);
    const { LocalityRates, AddLocalityRates, GetDocumentForm, DeleteRateTypes } = statecalls;
    const [Localityratesdata, setLocalityRatesdata] = useState([])
    const [searchlocalityrate, Setsearchlocalityrate] = useState([])
    const [selectedRate, setSelectedRate] = useState('0-12');

    const customernum = useRef();
    const formRef = useRef(null);
    const [loader, setLoader] = useState(true)
    const [formData, setFormData] = useState({
        locality: "",
        Ward: "",
        Meter: "",
        RccRate: "",
        OtherPakkaRate: '',
        KacchaRate: "",
        type: "",
        id: ""
    })
    const [editingRowId, setEditingRowId] = useState(false);
    const [TypeofProperty, SetTypeofProperty] = useState([]);
    const [Locality, SetLocality] = useState([]);
    const [Meter, SetMeter] = useState([]);

    useEffect((e) => {
        GetForm()
        GetLocalityRates()
    }, [])

    async function GetLocalityRates(e) {
        const data = await LocalityRates()
        setLocalityRatesdata(data)
        Setsearchlocalityrate(data)
    }

    async function SetLocalityRates(e) {
        e.preventDefault();

        let obj = {
            ...formData,
            type: "insert"
        };
        console.log("obj", obj)


        const data = await AddLocalityRates(obj);
        if (data) {
            alert("Locality Rates added successfully");
            formRef.current.reset();
            setFormData({});
        } else {
            alert("not created");
        }
        handleReset();
        GetLocalityRates();
    }

    async function UpdateLocalityRates(e) {
        setLoader(false)
        e.preventDefault()
        let obj = {
            ...formData,
            type: "update"
        }

        const data = await AddLocalityRates(obj)
        console.log(data);

        if (data.affectedRows > 0) {
            alert("updated");
            setEditingRowId(false)
            formRef.current.reset();
            setFormData({});
            GetLocalityRates()
        }
        else {
            alert("not updated");
        }
        GetLocalityRates()
        // handleReset()
        setLoader(true)
    }

    async function GetForm() {
        let data = await GetDocumentForm();
        SetTypeofProperty(data.toproperty)
        SetLocality(data.locality)
        SetMeter(data.meter)
    }

    function handleChange(e, range = null) {
        const { name, value } = e.target;
        console.log("e", e)

        if (range) {
            // If a range is provided, update the corresponding rate data
            setFormData(prevState => ({
                ...prevState,
                [range]: {
                    ...prevState[range],
                    [name]: value
                }
            }));
        } else {
            // If no range is provided, update the form data directly
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
            console.log("formData", formData)
        }
    }

    const handleReset = () => {
        formRef.current.reset();
        setFormData({
            locality: "",
            Ward: "",
            Meter: "",
            RccRate: "",
            OtherPakkaRate: '',
            KacchaRate: "",
            type: ""
        })
    };

    const debounce = (func, delay) => {
        let debounceTimer;
        return function (...args) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(this, args), delay);
        };
    };
    const SearchLocalityRate = (e) => {
        let searchValue = e.target.value.toLowerCase();
        if (!searchValue) {
            setLocalityRatesdata(searchlocalityrate);
            return;
        }
        let newData = searchlocalityrate.filter((item) => {
            return (
                item.locality.toLowerCase().includes(searchValue) ||
                item.Ward.toLowerCase().includes(searchValue)

            )
        });
        setLocalityRatesdata(newData);
    };
    const debouncedSearch = useCallback(debounce(SearchLocalityRate, 800), [searchlocalityrate]);

    function startedit(data) {
        setFormData(data)

    }

    const popupOpen = (e, data) => {

        var result = confirm(`Do you want to delete Locality rate for: Ward- ${data.Ward}, Meter- ${data.Meter}`);
        if (result) {
            DeleteRateType(e, data.id);
            GetForm()
            GetLocalityRates()
            window.location.reload()
        } else {
            GetForm()
            GetLocalityRates()
            window.location.reload()
        }
    }
    async function DeleteRateType(e, id) {
        await DeleteRateTypes(id); // Wait for the delete operation to complete
        alert("Locality Rates Deleted Successfully");
        GetLocalityRates();
    }


    function cards(data) {
        if (editingRowId === data.id) {
            return (
                <>
                    <tr>
                        <td><input type="number" name="id" value={formData.id} onChange={handleChange} /></td>
                        <td><input type="text" name="locality" value={formData.locality} onChange={handleChange} /></td>
                        <td><input type="text" name="Ward" value={formData.Ward} onChange={handleChange} /></td>
                        <td><input type="text" name="Meter" value={formData.Meter} onChange={handleChange} /></td>
                        <td><input type="text" name="RccRate" value={formData.RccRate} onChange={handleChange} /></td>
                        <td><input type="text" name="OtherPakkaRate" value={formData.OtherPakkaRate} onChange={handleChange} /></td>
                        <td><input type="text" name="KacchaRate" value={formData.KacchaRate} onChange={handleChange} /></td>
                        <td>
                            <button className='btn btn-primary mx-1' onClick={() => setEditingRowId(false)}>Close</button>
                            <button className='btn btn-success mx-1 my-1' onClick={UpdateLocalityRates}>Save</button>
                        </td>
                    </tr>
                </>
            );
        } else {
            return (
                <>
                    <tr>
                        <td>{data.id}</td>
                        <td>{data.locality}</td>
                        <td>{data.Ward}</td>
                        <td>{data.Meter}</td>
                        <td>{data.RccRate}</td>
                        <td>{data.OtherPakkaRate}</td>
                        <td>{data.KacchaRate}</td>
                        <td>
                            <button className='btn btn-primary mx-1' onClick={() => handleEdit(data)}>Edit</button>
                            <button className='btn btn-danger my-1' onClick={(e) => popupOpen(e, data)}>Delete</button>
                        </td>
                    </tr>
                </>
            );
        }
    }


    const handleEdit = (data) => {
        setEditingRowId(data.id);
        setFormData({
            id: data.id,
            locality: data.locality,
            Ward: data.Ward,
            Zone: data.Zone,
            Meter: data.Meter,
            RccRate: data.RccRate,
            OtherPakkaRate: data.OtherPakkaRate,
            KacchaRate: data.KacchaRate,
        });
    };


    return (
        <>
            <div className="" style={{ backgroundColor: '#f5f7fe' }}>
                <h3 style={{ padding: '20px' }}>Master:Locality Rates</h3>
                <div className='mt-3' style={{ width: '60rem', margin: '30px 60px', borderRadius: '15px', backgroundColor: 'white' }}>
                    <form ref={formRef} onSubmit={formData?.id ? UpdateLocalityRates : SetLocalityRates} style={{ display: "grid", padding: "50px" }}>


                        <label style={{ fontWeight: 'bold' }} className='form-label'>Locality</label>
                        <div className='d-flex' style={{ height: '4rem' }}>
                            <Dropdown Locality={Locality} ID={'customlocality'} keyname={'locality'} handleChange={handleChange} />
                            <input id='customlocality' value={formData.locality} placeholder='If Other Enter Locality' className='form-control mb-3 customnamer mx-3' name='locality' type='text' onChange={(e) => { handleChange(e) }} ref={customernum} required />
                        </div>

                        <label style={{ fontWeight: 'bold' }} className='form-label'>Ward</label>
                        <div className='d-flex' style={{ height: '4rem' }}>
                            <Dropdown Locality={Locality} ID={'customward'} keyname={'Ward'} handleChange={handleChange} />
                            <input id='customward' value={formData.Ward} placeholder='If Other Enter Ward' className='form-control mb-3 customnamer mx-3' name='Ward' type='text' onChange={(e) => { handleChange(e) }} ref={customernum} required />
                        </div>

                        {/* <label style={{ fontWeight: 'bold' }} className='form-label'>Zone</label>
                        <div className='d-flex' style={{ height: '4rem' }}>
                            <Dropdown Locality={Locality} ID={'customzone'} keyname={'Zone'} handleChange={handleChange} />
                            <input id='customward' value={formData.Zone} placeholder='If Other Enter Zone' className='form-control mb-3 customnamer mx-3' name='Zone' type='text' onChange={(e) => { handleChange(e) }} ref={customernum} required />
                        </div> */}
                        {/* <label style={{ fontWeight: 'bold' }} className='form-label'>Meter</label>
                        <select className="form-select mb-3" name="Meter" onChange={(e) => { handleChange(e) }} ref={customernum} required>
                            <option disabled selected>Select Meter</option>
                           
                            {Meter && Meter.map((e) => (
                                <option className="form-control" value={e.Meter} >{e.Meter}</option>
                            ))}
                        </select> */}

                        <div className="" role="group" aria-label="Vertical radio toggle button group">

                            <label style={{ width: '5rem' }} className="btn btn-outline-primary mb-2" >0-9</label>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <label style={{ fontWeight: 'bold' }} className='form-label' >RCC Rate</label>
                                    <input placeholder='Enter Rate' className='form-control mb-3 ' name='RccRate' type="number" step="0.01" onChange={(e) => { handleChange(e, '0-9') }} required />
                                </div>
                                <div >
                                    <label style={{ fontWeight: 'bold' }} className='form-label' >Other Pakka Rate</label>
                                    <input placeholder='Enter Other Pakka Rate' className='form-control mb-3 ' name='OtherPakkaRate' type='number' step="0.01" onChange={(e) => { handleChange(e, '0-9') }} ref={customernum} required />
                                </div>
                                <div >
                                    <label style={{ fontWeight: 'bold' }} className='form-label' >Kaccha Rate</label>
                                    <input placeholder='Enter Kaccha Rate' className='form-control mb-3 ' name='KacchaRate' type='number' step="0.01" onChange={(e) => { handleChange(e, '0-9') }} ref={customernum} required />
                                </div>
                            </div>


                            <label style={{ width: '5rem' }} className="btn btn-outline-primary mb-2" for="btnradio2">09-12</label>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ display: 'block' }}>
                                    <label style={{ fontWeight: 'bold' }} className='form-label' >RCC Rate</label>
                                    <input placeholder='Enter Rate' className='form-control mb-3' name='RccRate' type='number' step="0.01" onChange={(e) => { handleChange(e, '9-12') }} ref={customernum} required />
                                </div>
                                <div style={{ display: 'block' }}>
                                    <label style={{ fontWeight: 'bold' }} className='form-label' >Other Pakka Rate</label>
                                    <input placeholder='Enter Other Pakka Rate' className='form-control mb-3' name='OtherPakkaRate' type='number' step="0.01" onChange={(e) => { handleChange(e, '9-12') }} ref={customernum} required />
                                </div>
                                <div style={{ display: 'block' }}>
                                    <label style={{ fontWeight: 'bold' }} className='form-label' >Kaccha Rate</label>
                                    <input placeholder='Enter Kaccha Rate' className='form-control mb-3' name='KacchaRate' type='number' step="0.01" onChange={(e) => { handleChange(e, '9-12') }} ref={customernum} required />
                                </div>

                            </div>
                            <label style={{ width: '5rem' }} className="btn btn-outline-primary" for="btnradio3">12-24</label>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ display: 'block' }}>
                                    <label style={{ fontWeight: 'bold' }} className='form-label' >RCC Rate</label>
                                    <input placeholder='Enter Rate' className='form-control mb-3' name='RccRate' type='number' step="0.01" onChange={(e) => { handleChange(e, '12-24') }} required />
                                </div>
                                <div style={{ display: 'block' }}>
                                    <label style={{ fontWeight: 'bold' }} className='form-label' >Other Pakka Rate</label>
                                    <input placeholder='Enter Other Pakka Rate' className='form-control mb-3' name='OtherPakkaRate' type='number' step="0.01" onChange={(e) => { handleChange(e, '12-24') }} ref={customernum} required />
                                </div>
                                <div style={{ display: 'block' }}>
                                    <label style={{ fontWeight: 'bold' }} className='form-label' >Kaccha Rate</label>
                                    <input placeholder='Enter Kaccha Rate' className='form-control mb-3 ' name='KacchaRate' type='number' step="0.01" onChange={(e) => { handleChange(e, '12-24') }} ref={customernum} required />
                                </div>

                            </div>
                            <label style={{ width: '6rem' }} className="btn btn-outline-primary" for="btnradio3">24-Above</label>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ display: 'block' }}>
                                    <label style={{ fontWeight: 'bold' }} className='form-label' >RCC Rate</label>
                                    <input placeholder='Enter Rate' className='form-control mb-3' name='RccRate' type='number' step="0.01" onChange={(e) => { handleChange(e, '24-above') }} required />
                                </div>
                                <div style={{ display: 'block' }}>
                                    <label style={{ fontWeight: 'bold' }} className='form-label' >Other Pakka Rate</label>
                                    <input placeholder='Enter Other Pakka Rate' className='form-control mb-3' name='OtherPakkaRate' type='number' step="0.01" onChange={(e) => { handleChange(e, '24-above') }} ref={customernum} required />
                                </div>
                                <div style={{ display: 'block' }}>
                                    <label style={{ fontWeight: 'bold' }} className='form-label' >Kaccha Rate</label>
                                    <input placeholder='Enter Kaccha Rate' className='form-control mb-3 ' name='KacchaRate' type='number' step="0.01" onChange={(e) => { handleChange(e, '24-above') }} ref={customernum} required />
                                </div>

                            </div>
                        </div>

                        <div class="d-grid gap-2 d-md-flex justify-content-md-center my-3">
                            <button style={{ backgroundColor: '#e5e5e5', borderRadius: '12px' }} class="btn me-md-2" type="button" onClick={handleReset}>Clear</button>
                            <button style={{ backgroundColor: '#f1772e', color: 'white', borderRadius: '12px' }} class="btn" type="submit">{formData?.id ? "Update" : "Add Locality Rates"}</button>
                        </div>
                    </form>
                </div>

                <div className="mt-5" style={{ display: 'flex', justifyContent: 'space-around', padding: '15px 30px' }}>
                    <h3>Locality Rate Lists</h3>
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
                            onChange={(e) => { debouncedSearch(e) }}
                        />
                    </div>
                </div>

                <div style={{ width: '70vw', backgroundColor: 'white', borderRadius: '15px', margin: '25px 45px', textAlign: 'center' }}>
                    <div style={{ padding: "20px", overflow: 'auto' }}>
                        <table className='my-2 table table-bordered table-responsive'>
                            <thead className='table-light'>
                                <tr>
                                    <th>ID</th>
                                    <th>Locality</th>
                                    <th>Ward</th>
                                    <th>Meter</th>
                                    <th>RCC Rate</th>
                                    <th>Other Pakka Rate</th>
                                    <th>Kaccha Rate</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {Array.isArray && Localityratesdata && loader && Localityratesdata.length > 0 ? (

                                    <Pagination data={Localityratesdata} perPageItems={10} func={c => cards(c)} searchparam={["locality", "Ward", "Zone"]} searchword={""} useeffectactive={Localityratesdata} />
                                ) : (
                                    <tr>
                                        <td colSpan="15">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                    </div>
                    {/* <div id='sja' hidden={true}><Popup key={formData?.id}  Dyanmicpage={EditPage}  keyname={formData.Zone} data={formData}/></div> */}

                </div>
            </div>
        </>
    )
}

export default LocalityRatesPage