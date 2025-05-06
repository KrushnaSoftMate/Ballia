 "use client";

import Link from "next/link";
import { useState } from "react";

// import MainNav from '@/Components/LandingPageComp/MainNav'
// import { Customer } from "@/app/AdminContext/CustomerManagement";
// import React, { useState, useContext, useEffect, Suspense } from "react";
// import Link from 'next/link';


const CheckMyApplication = () => {
    // // const statecalls = useContext(Customer);
    // const { GetMyDeathApplication } = statecalls;
    const [form, setForm] = useState({})
    const [getdata, setData] = useState([])

    async function handleSubmit(x) {
        x.preventDefault();
        try {
            console.log("Submitting form:", form);
            let data = await GetMyDeathApplication(form)
            setData(data)
            console.log("Form submitted, response:", data);
            // alert("Form Submitted Successfuly")
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // const handleInputChange = (e) => {
    //     const { id, value } = e.currentTarget;
    //     const invalidChars = /[^0-9]/g;

    //     if (invalidChars.test(value)) {
    //         alert("Only numeric characters are allowed");
    //     }
    //     const sanitizedValue = value.replace(invalidChars, '');
    //     setBillData({ ...billdata, [id]: sanitizedValue });
    // };

    return (
        <>
    {/* <MainNav></MainNav> */}
    <Link href="/CItizen/DeathCertificateForm">
    <button className="btn btn-primary">Back</button>
    </Link>
            <div style={{ height: '50vh', display: "grid", justifyContent: "center", alignItems: 'center', backgroundImage: 'url(/ViewBill.png)', backgroundSize: 'cover' }}>
                <form onSubmit={handleSubmit} style={{ height: '13vh', display: "grid", }}>
                    <h3>View My Death Applications</h3>
                    <input autoComplete="off" className="form-control" type="text" id="informant_mobile" placeholder="Search by your contact number" maxLength={30} onChange={(x) => setForm({ ...form, [x.currentTarget.id]: x.currentTarget.value })} />
                    <div style={{ display: "flex", justifyContent: "center", marginTop: '15px' }}>
                        <button style={{ backgroundColor: '#ec931f', color: "white" }} className="my-2 mx-2 btn">View Complaint</button>
                    </div>
                </form>
            </div>
            <div style={{ display: "grid", justifyContent: "center", alignItems: "center" }}>
              
                {
                    getdata?.map((e) => {
                        return (
                            <>
                                <div class="card " style={{ width: "18rem", marginTop: "10px", backgroundColor: 'blue',color:'white' }}>
                                    <div class="card-body">
                                        <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">Death date : {e.date_of_death}</h6>
                                        <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">uid_number : {e.uid_number}</h6>
                                        <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">fullname  : {e.fullname}</h6>
                                        <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">gender : {e.gender}</h6>
                                        <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">age : {e.age_description}</h6>
                                        <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">father_name : {e.father_name}</h6>
                                        <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">mother_uid : {e.mother_uid_number}</h6>
                                        <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">mother_name : {e.mother_name}</h6>
                                        <h6 style={{ borderBottom: '1px solid gray' }} class="card-title"> husbund_or_spouse_name : {e. husbund_or_spouse_name}</h6>
                                        <h6 style={{ borderBottom: '1px solid gray' }} 
                                        class="card-title">permanent_address : {e.permanent_address}</h6>
                                        <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">death_place : {e.death_place}</h6>
                                        <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">disease_or_actual_cause_of_death : {e.disease_or_actual_cause_of_death}</h6>
                                        <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">informant_name : {e.informant_name}</h6>
                                        <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">informant_mobile : {e.informant_mobile}</h6>
                                        <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">district_name : {e.district_name}</h6>
                                        <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">religion : {e.religion}</h6>
                                        <h6 style={{ borderBottom: '1px solid gray' }} class="card-title">medical_treatment_type : {e.medical_treatment_type}</h6>
                                        <h6 style={{ borderBottom: '1px solid gray' }} className="card-title">Approvance:{e.Approvance}</h6>
                                        {e.Approvance === "Approved" && (
                                            <Link href={"/Certificates/CheckMyDeathApplication/"+e.informant_mobile}> <button type='button'  className="btn btn-primary">Get Certificate</button></Link>
                                        )}
                                    </div>
                                </div>
                            </>
                        )
                    })
                }

            </div>






        </>
    );
};

export default CheckMyApplication;
