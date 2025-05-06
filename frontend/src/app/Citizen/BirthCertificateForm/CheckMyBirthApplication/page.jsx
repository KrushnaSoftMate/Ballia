 "use client";

import Link from "next/link";
import { useState } from "react";

// import MainNav from '@/Components/LandingPageComp/MainNav'
// import { Customer } from "@/app/AdminContext/CustomerManagement";
// import React, { useState, useContext, useEffect, Suspense } from "react";
// import Link from 'next/link';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import { backend } from '../../paths'

const CheckMyApplication = () => {
    // // const statecalls = useContext(Customer);
    // const { GetMyBirthApplication } = statecalls;
    const [form, setForm] = useState({})
    const [getdata, setData] = useState([])

    async function handleSubmit(x) {
        x.preventDefault();
        try {
            console.log("Submitting form:", form);
            let data = await GetMyBirthApplication(form)
            setData(data)
            console.log("Form submitted, response:", data);
            // alert("Form Submitted Successfuly")
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const getValue = (value) => {
        return value && value !== "" ? value : "N/A";
    };
    const generatePDF = async () => {
        const input = document.getElementById("applicationData");
        const pdf = new jsPDF("p", "pt", "a4");

        await html2canvas(input, { scale: 1 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("application-data.pdf");
        });
    };
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
        <Link href="/Citizen/BirthCertificateForm">
        <button className="btn btn-primary">Back</button>
        </Link>
            {/* <MainNav></MainNav> */}
            <div style={{ height: '50vh', display: "grid", justifyContent: "center", alignItems: 'center', backgroundImage: 'url(/ViewBill.png)', backgroundSize: 'cover' }}>
                <form onSubmit={handleSubmit} style={{ height: '13vh', display: "grid", }}>
                    <h3>मेरा जन्म आवेदन देखें</h3>
                    <input autoComplete="off" className="form-control" type="text" id="informant_mobile" placeholder="अपने संपर्क नंबर से खोजें" maxLength={30} onChange={(x) => setForm({ ...form, [x.currentTarget.id]: x.currentTarget.value })} />
                    <div style={{ display: "flex", justifyContent: "center", marginTop: '15px' }}>
                        <button type='submit' style={{ backgroundColor: '#ec931f', color: "white" }} className="my-2 mx-2 btn">आवेदन देखें</button>
                    </div>
                </form>
            </div>
            <div style={{ display: "grid", justifyContent: "center", alignItems: "center", padding: '10px' }}>

                {
                    getdata?.map((e) => {
                        return (
                            <>
                                {getdata?.length > 0 ? <button onClick={generatePDF} style={{ backgroundColor: '#ec931f', color: "white" }} className="my-2 mx-2 btn">
                                    Download as PDF
                                </button> : ''}
                                <div className='container' key={e.id} id="applicationData">
                                    <div className='row'>
                                        <div style={{ width: '60rem', border: '1px solid black', borderRadius: '10px', height: '40rem', paddingTop: '12px' }}>
                                            <div style={{ paddingTop: '20px' }}>
                                                <div className="row mb-2 d-flex justify-content-center text-center text-md-start">
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} class="card-title">Birth date : <b>{getValue(e.birth_date)}</b></h5>
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} class="card-title">Gender : <b>{getValue(e.gender)}</b></h5>
                                                    </div>
                                                </div>
                                                <div className="row mb-2 d-flex justify-content-center text-center text-md-start">
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} class="card-title">baby_name_hindi  : <b>{getValue(e.baby_name_hindi)}</b></h5>
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} class="card-title">baby_name_english :<b> {getValue(e.baby_name_english)}</b></h5>
                                                    </div>
                                                </div>
                                                <div className="row mb-2 d-flex justify-content-center text-center text-md-start">
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} class="card-title">father_name_hindi : <b>{getValue(e.father_name_hindi)}</b></h5>
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} class="card-title">father_name_hindi : {getValue(e.father_name_hindi)}</h5>
                                                    </div>
                                                </div>
                                                <div className="row mb-2 d-flex justify-content-center text-center text-md-start">
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} class="card-title">father_name_english :<b> {getValue(e.father_name_english)}</b></h5>
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} class="card-title">mother_uid :<b> {getValue(e.mother_uid)}</b></h5>
                                                    </div>
                                                </div >
                                                <div className="row mb-2 d-flex justify-content-center text-center text-md-start">
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} class="card-title">mother_name_hindi : <b>{getValue(e.mother_name_hindi)}</b></h5>
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} class="card-title">mother_name_english : <b>{getValue(e.mother_name_english)}</b></h5>
                                                    </div>
                                                </div>
                                                <div className="row mb-2 d-flex justify-content-center text-center text-md-start">
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} class="card-title">address :<b> {getValue(e.address)}</b></h5>
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} class="card-title">birth_place : <b>{getValue(e.birth_place)}</b></h5>
                                                    </div>
                                                </div>
                                                <div className="row mb-2 d-flex justify-content-center text-center text-md-start">
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} class="card-title">place_name : <b>{getValue(e.place_name)}</b></h5>
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} className="card-title">place_address:<b>{getValue(e.place_address)}</b></h5>
                                                    </div>
                                                </div>
                                                <div className="row mb-2 d-flex justify-content-center text-center text-md-start">
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} class="card-title">phone : <b>{getValue(e.phone)}</b></h5>
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} className="card-title">email:<b>{getValue(e.email)}</b></h5>
                                                    </div>
                                                </div>
                                                <div className="row mb-2 d-flex justify-content-center text-center text-md-start">
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} class="card-title">form_date : <b>{getValue(e.form_date)}</b></h5>
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} className="card-title">residence_area_name:<b>{getValue(e.residence_area_name)}</b></h5>
                                                    </div>
                                                </div>
                                                <div className="row mb-2 d-flex justify-content-center text-center text-md-start">
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} class="card-title">city_or_village : <b>{getValue(e.city_or_village)}</b></h5>
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} className="card-title">district_name:<b>{getValue(e.district_name)}</b></h5>
                                                    </div>
                                                </div>
                                                <div className="row mb-2 d-flex justify-content-center text-center text-md-start">
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} class="card-title">state_name : <b>{getValue(e.state_name)}</b></h5>
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} className="card-title">religion:<b>{getValue(e.religion)}</b></h5>
                                                    </div>
                                                </div>
                                                <div className="row mb-2 d-flex justify-content-center text-center text-md-start">
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} class="card-title">father_education : <b>{getValue(e.father_education)}</b></h5>
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} className="card-title">mother_education:<b>{getValue(e.mother_education)}</b></h5>
                                                    </div>
                                                </div>
                                                <div className="row mb-2 d-flex justify-content-center text-center text-md-start">
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} class="card-title">father_occupation : <b>{getValue(e.father_occupation)}</b></h5>
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} className="card-title">mother_occupation:<b>{getValue(e.mother_occupation)}</b></h5>
                                                    </div>
                                                </div>
                                                <div className="row mb-2 d-flex justify-content-center text-center text-md-start">
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} class="card-title">mother_age_at_marriage : <b>{getValue(e.mother_age_at_marriage)}</b></h5>
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} className="card-title">live_children_count:<b>{getValue(e.live_children_count)}</b></h5>
                                                    </div>
                                                </div>
                                                <div className="row mb-2 d-flex justify-content-center text-center text-md-start">
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} class="card-title">delivery_method : <b>{getValue(e.deldelivery_methodivery_by)}</b></h5>
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} className="card-title">pregnancy_weeks:<b>{getValue(e.pregnancy_weeks)}</b></h5>
                                                    </div>
                                                </div>
                                                <div className="row mb-2 d-flex justify-content-center text-center text-md-start">
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} class="card-title">mother_age_at_birth : <b>{getValue(e.mother_age_at_birth)}</b></h5>
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} className="card-title">delivery_by:<b>{getValue(e.delivery_by)}</b></h5>
                                                    </div>
                                                </div>
                                                <div className="row mb-2 d-flex justify-content-center text-center text-md-start">
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} class="card-title">birth_weight : <b>{getValue(e.birth_weight)}</b></h5>
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <h5 style={{ borderBottom: '1px solid gray' }} className="card-title">Document:<b><a href={`${backend}/BirthDocs/${e.file_path}`}target="_blank">View File</a></b></h5>
                                                    </div>
                                                </div>
                                                <div className="row mb-2 d-flex justify-content-center text-center text-md-start">
                                                <div className="col-12 col-md-6">
                                                    <h5 style={{ borderBottom: '1px solid gray' }} className="card-title">Approvance:<b>{getValue(e.Approvance)}</b></h5>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <h5 style={{ borderBottom: '1px solid gray' }} className="card-title">Photo of signature_or_thumb_photo:<b><a href={`${backend}/BirthDocs/${e.signatureorthumb}`}target="_blank">View Photo</a></b></h5>
                                                </div>
                                            </div>
                                                {/* {e.Approvance === "Approved" && (
                                                    <Link href={"/Certificates/CheckMyBirthApplication/" + e.informant_mobile}> <button type='button' className="btn btn-primary">Get Certificate</button></Link>
                                                )} */}
                                            </div>
                                        </div>
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
