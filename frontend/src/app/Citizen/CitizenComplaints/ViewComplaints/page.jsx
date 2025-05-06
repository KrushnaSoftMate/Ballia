"use client";
import { Customer } from "@/app/AdminContext/CustomerManagement";
import React, { useState, useContext, useEffect, Suspense } from "react";
// import { backend,apiurl } from '../../paths'

const ViewComplaint = () => {
    const statecalls = useContext(Customer);
    const { UserTicketInfo } = statecalls;
    const [form, setForm] = useState({})
    const [data, setData] = useState([])

    async function handleSubmit(x) {
        x.preventDefault();
        try {
            let data = await UserTicketInfo(form)
            if(data.length===0){
                alert("Please enter correct name")
                
            }else{ 
                setData(data)
            }
        } catch (error) {
            alert("Please Enter correct name")
            console.error("Error:", error);
        }
    }

    const handleInputChange = (e) => {
        const { id, value } = e.currentTarget;
        // Allow only safe characters (alphanumeric, spaces, etc.) and restrict length
        const safeCharacters = /^[a-zA-Z\s]*$/; // Allow only safe characters for email
        if (!safeCharacters.test(value)) {
          alert("Only safe characters are allowed(number not allowed) .");
          return;
      }
        setForm({ ...form, [id]: value });
      };
      const handleClose=(i)=>{
       let list= data.splice(i, 1);
        setData(data);
        setForm({})
      }
    return (
        <>

            <div style={{ height: '50vh', display: "grid", justifyContent: "center", alignItems: 'center', backgroundImage: 'url(/ViewComplaint.png)', backgroundSize: 'cover' }}>
                <form onSubmit={handleSubmit} style={{ height: '15vh', display: "grid", }}>
                    
                    <h3 style={{textAlign: 'center',marginBottom:'3rem'}}>View Complaint</h3>
                   
                    <input autoComplete="off" className="form-control mt-4" type="text" id="fullname" placeholder="Search by your name" maxLength={20} value={form.fullname || ''} onChange={handleInputChange} />
                    <div style={{ display: "flex", justifyContent: "center", marginTop: '15px' }}>
                        <button style={{ backgroundColor: '#ec931f', color: "white" }} className="my-2 mx-2 btn">View Complaint</button>
                    </div>
                </form>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {
                        data?.map((e ,index) => {
                            return (
                                <>
                                    <div class="card" style={{ width: "18rem",margin: "2rem",backgroundColor:'cornflowerblue' }} key={index}>
                                    <div className="d-inline-flex p-2 flex-row" > 
                                    <img src="/Profile.png" style={{margin:"auto" ,marginTop:"4px"}}></img>
                                    <img src="/Close-Dark Grey.png" style={{height:"2vh", width:"1vw" ,boxShadow:"inherit"}} onClick={(e,i)=>{handleClose(index)}}></img>
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title"><b>Your Information</b></h5>
                                        <p>Full Name :{e.fullname}</p>
                                        <p>Aadhar Number :{e.aadharcard}</p>
                                        <p>Contact Number :{e.contact}</p>
                                        <p>Email :{e.email}</p>
                                        <p>Message :{e.Message}</p>
                                        <p>Ticket Number :{e.TicketNumber}</p>
                                        <p>Ticket Status :{e.TicketStatus}</p>
                                        <img style={{ borderRadius: '20px' }} src={backend + "/Complaints/" + e.photo}></img>
                                        <p><a href={`${backend}/Complaints/${e.photo}`} target="_blank">View Image</a></p>
                                        <p> <a href={`${backend}/Complaints/${e.document}`} target="_blank">View File</a></p>
                                        <a href={"/Customer/ViewComplaint/" + e?.TicketNumber + '/' + e.fullname} class="btn btn-primary">Chat</a>
                                    </div>
                                </div >
                            </>
                )
                                })
                            }

            </div>
      
          




        </>
    );
};

export default ViewComplaint;
