"use client";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { Agent } from '@/app/AdminContext/AgentManagement';

const Page = () => {
    const { GetPermit, CreateLicense, getpermitbyid } = useContext(Agent);
    const [formData, setFormData] = useState({
        // BillNumber: '',
        FullName: '',
        ContactNumber: '',
        AadharNumber: '',
        PanNumber: '',
        Location: "",
        Address: "",
        Locality: "",
        Meter: "",
        // Gala: "",
        GalaType: "",
        PermitID: "",
        PermitType: "",
        Permitset: ""
    });
    const [permittype, setPermitType] = useState([]);
    const [permittypedoc, setPermitTypeDoc] = useState([]);
    const [Locality, SetLocality] = useState([]);
    const [Meter, SetMeter] = useState([]);

    useEffect(() => {
        GetForm();
        return () => { };
    }, []);
    async function getlocation(e) {
        e.stopPropagation()
        if (typeof navigator != undefined) {
            navigator.geolocation.getCurrentPosition((x) => {
                let lat = x.coords.latitude
                let long = x.coords.longitude
                let val = lat + '/' + long
                setFormData({
                    ...formData,
                    ['Location']: val,
                });
            })
        } else {
            alert('not available')
        }

    }
    async function GetForm() {
        let data = await GetPermit();
        SetLocality(data.locality)
        SetMeter(data.meter)
        setPermitType(data.permit)


    }

    async function GetPermitDoc(id) {
        let datapermit = await getpermitbyid(id);
        formData.Permitset = JSON.stringify(datapermit[0])
        let docarray = Array.from({ length: datapermit[0]?.DocumentRequired }, () => "vads")
        setPermitTypeDoc(docarray)
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const uploadform = new FormData()
        try {
            Object.keys(formData).map((x) => {
                uploadform.append(x, formData[x])
            })
            permittypedoc.map((item, index) => {
                if (document.getElementById('vads' + '-' + index).files[0] == undefined) {
                    return
                } else {
                    uploadform.append('PermitDocs', document.getElementById('vads' + '-' + index).files[0])
                }
            })
            CreateLicense(uploadform)
        } catch (error) {
            console.log(error);
        }

    };

    return (

        <div style={{ display: "grid", width: '100%', alignItems: 'center', backgroundColor: '#f2f4f7', padding: '20px' }}>
            <h4>License Management : Create License</h4>

            <form onSubmit={handleSubmit} style={{ display: 'flex', width: '100%', justifyContent: "center", flexWrap: "wrap", padding: '3%', borderRadius: '20px', backgroundColor: 'white', marginTop: '10px' }}>
                {/* <div hidden className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }} >Bill Number</label><br />
          <input type="text" name="BillNumber" value={formData.propertyID} placeholder="Bill Number" onChange={handleChange} className='form-control mt-2' required />
        </div> */}

                <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Full Name</label><br />
                    <input type="text" name="FullName" value={formData.FullName} placeholder="Full Name" onChange={handleChange} className='form-control mt-2' required />
                </div>

                <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Contact Number</label><br />
                    <input type="text" name="ContactNumber" value={formData.ContactNumber} placeholder="Contact Number" onChange={handleChange} className='form-control mt-2' required />
                </div>

                <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Aadhar Number</label><br />
                    <input type="text" name="AadharNumber" value={formData.AadharNumber} placeholder="Aadhar Number" onChange={handleChange} className='form-control mt-2' required />
                </div>

                <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Pan Number</label><br />
                    <input type="text" name="PanNumber" value={formData.PanNumber} placeholder="Pan Number" onChange={handleChange} className='form-control mt-2' required />
                </div>

                <div className="mx-2" style={{ width: '91%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Address</label><br />
                    <textarea name="Address" value={formData.Address} placeholder="Address" onChange={handleChange} className='form-control mt-2' required />
                </div>

                <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Permit Type</label><br />
                    <select className="form-control mt-2" name="PermitType" onChange={(e) => { (handleChange, GetPermitDoc(e.currentTarget.value)) }} required>
                        <option selected disabled>Select Permit</option>
                        {permittype && permittype.map((e) => (
                            <option className="form-control mt-2" value={e.id} id={e.PermitTypes}>{e.PermitTypes}</option>
                        ))}
                    </select>
                </div>

                <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Location</label><br />
                    <div className="mt-2" style={{ display: 'flex', height: '40px', fontSize: '20px' }}>
                        <button type="button" style={{ fontSize: '13px', width: '10rem' }} className="btn btn-primary" onClick={(e) => {e.stopPropagation(); getlocation(e) }}>Get Location</button>
                        <input className="form-control " type="text" name="Location" value={formData.Location} required />
                    </div>
                </div>

                <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Locality</label><br />
                    <select className="form-control mt-2" name="Locality" onChange={(e) => { handleChange(e) }} required>
                        <option selected disabled>Select Locality</option>
                        {Locality && Locality.map((e) => (
                            <option className="form-control mt-2" value={e.uniqueness} id={e.uniqueness}>{e.uniqueness}</option>
                        ))}
                    </select>
                </div>


                <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Meter</label><br />
                    <select className="form-control mt-2" name="Meter" onChange={(e) => { handleChange(e) }} required>
                        <option selected disabled>Select Meter</option>
                        {Meter && Meter.map((e) => (
                            <option className="form-control mt-2" value={e.Meter} id={e.Meter}>{e.Meter}</option>
                        ))}
                    </select>
                </div>

                <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Gala Type</label><br />
                    <select className="form-control mt-2" name="GalaType" onChange={(e) => { handleChange(e) }} required>
                        <option selected disabled>Select Meter</option>
                        <option className="form-control mt-2" value="Private">Private</option>
                        <option className="form-control mt-2" value="Government">Government</option>
                    </select>
                </div>


                <Suspense>
                    {permittypedoc &&
                        permittypedoc.map((e, index) => (

                            <div key={index} className="mx-2" style={{ width: '45%', padding: '8px' }}>
                                <label>Document- {index + 1}</label>
                                <input className="form-control mt-2"
                                    type="file"
                                    name={e.PermitTypes}
                                    id={'vads' + '-' + index}
                                // onChange={ImageForm}
                                />
                            </div>
                        ))}
                </Suspense>

                <button type='submit' className="form-control mt-2 btn btn-success my-2" >Submit</button>
            </form>
        </div>

    );
};

export default Page;
