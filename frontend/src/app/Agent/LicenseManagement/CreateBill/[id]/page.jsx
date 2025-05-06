"use client";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { Agent } from '@/app/AdminContext/AgentManagement';

const Page = ({ params }) => {
    const { GetPermit, CreateLicenseBill, GetCustomerLicense ,getpermitbyid} = useContext(Agent);
    const id = params.id
    const [formData, setFormData] = useState({
        Gala:"",
        Rate: "",
        FromDate: "",
        ToDate: ""
    });
    const [customerdata, setCustomerData] = useState([]);
    const [permitrate, SetPermitRate] = useState([]);

    useEffect(() => {
        GetForm();
        return () => { };
    }, []);

    async function GetForm() {
        const data = await GetCustomerLicense(id);
        setCustomerData(data[0])
        let datapermit = await getpermitbyid(data[0].PermitID);
        SetPermitRate(datapermit[0])
        let obj = {...formData}
        obj.Rate=datapermit[0].Rate
        obj.Gala = data[0].Gala
        setFormData(obj)
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        
          let data = await CreateLicenseBill(formData)
        

    };

    return (

        <div style={{ display: "grid", width: '100%', alignItems: 'center', backgroundColor: '#f2f4f7', padding: '20px' }}>
            <h4>Bill Management : Create Permit Bill</h4>

            <form onSubmit={handleSubmit} style={{ display: 'flex', width: '100%', justifyContent: "center", flexWrap: "wrap", padding: '3%', borderRadius: '20px', backgroundColor: 'white', marginTop: '10px' }}>
                {/* <div hidden className="mx-2" style={{ width: '45%', padding: '8px' }} >
          <label style={{ fontWeight: 'bold' }} >Bill Number</label><br />
          <input type="text" name="BillNumber" value={formData.propertyID} placeholder="Bill Number" onChange={handleChange} className='form-control mt-2' required />
        </div> */}

                <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Full Name</label><br />
                    <input value={customerdata.FullName} className='form-control mt-2' />
                </div>

                <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Contact Number</label><br />
                    <input value={customerdata.ContactNumber} className='form-control mt-2' />
                </div>

                <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Aadhar Number</label><br />
                    <input value={customerdata.AadharNumber} className='form-control mt-2' />
                </div>

                <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Pan Number</label><br />
                    <input value={customerdata.PanNumber} className='form-control mt-2' />
                </div>



                <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Rate</label><br />
                    <input type="text" name="Rate" value={permitrate.Rate} placeholder={permitrate.Rate} className='form-control mt-2' required />
                </div>

                <div className="mx-2" style={{ width: '91%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Address</label><br />
                    <textarea value={customerdata.Address} className='form-control mt-2' />
                </div>

                <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Location</label><br />
                    <input className="form-control " value={customerdata.Location} />
                </div>

                <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Locality</label><br />
                    <input className='form-control mt-2' value={customerdata.Locality} />
                </div>

                <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Meter</label><br />
                    <input className='form-control mt-2' value={customerdata.Meter} />
                </div>

                <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>Gala No.</label><br />
                    <input value={customerdata.Gala} className='form-control mt-2' />
                </div>

                <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>From Date</label><br />
                    <input type="date" name="FromDate" value={formData.FromDate} placeholder="Select Date" onChange={handleChange} className='form-control mt-2' required />
                </div>

                <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                    <label style={{ fontWeight: 'bold' }}>To Date</label><br />
                    <input type="date" name="ToDate" value={formData.ToDate} placeholder="Select Date" onChange={handleChange} className='form-control mt-2' required />
                </div>
                <button type='submit' className="form-control mt-2 btn btn-success my-2" >Submit</button>
            </form>
        </div>

    );
};

export default Page;
