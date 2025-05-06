"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import './navbar.css';
import Link from "next/link";
// import "../../Components/Demopages/LandingPage.css"
const Page = ({ children }) => {

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const btn = document.getElementById('nextbtn')
    if (btn) {
      setInterval(() => { btn.click() }, 4000)
    }
  }, [])

  return (

    <div>
      {loading ? (<div style={{ display: "grid", justifyContent: "center", position: "absolute", zIndex: "10", top: "65vh", width: "100vw" }}>
        <div className="loader" style={{ alignSelf: "center", justifySelf: "center" }}></div>
        {/* <h2>Loading.......</h2> */}
      </div>) : ''}
      <div id="carouselExample" class="carousel slide">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              style={{ height: "60vh" }}
              src="/Slider Images/Vrittikut-Ashram-Pakdi-Ballia.png"
              class="d-block w-100"
              alt="..."
            />
          </div>
          {/* <div class="carousel-item">
            <img style={{ height: "60vh" }} src="/Img1slide.png" class="d-block w-100" alt="..." />
          </div> */}
          {/* <div class="carousel-item">
            <img style={{ height: "60vh" }} src="/devi.png" class="d-block w-100" alt="..." />
          </div> */}
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          id='nextbtn'
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          height: 'auto',
          padding: "2rem",
          justifyContent: 'space-around',
          backgroundColor: '#f2fcf7',
        }}
      >

        {/* <div
          class="card my-3"
          onClick={() => {
            setLoading(true)
            router.push("Customer/ViewBill");
          }}
          style={{ boxShadow: '0px 6px 0px 0px #0071bc', width: "17rem", cursor: "pointer" }}
        >
          <img
            style={{ height: "6rem", width: "36%", margin: '2rem 5rem' }}
            src="/View-Bill.png"
            class="card-img"
            alt="..."
          />
          <div class="">
            <h5
              class="card-title"
              style={{ color: "black", textAlign: "center" }}
            >
              View Bill
            </h5>
            <p style={{ textAlign: "center" }} class="card-text">
              <small>Click here for View Bill Details</small>
            </p>
          </div>
        </div> */}

        {/* <div
          class="card my-3"
          style={{ boxShadow: '0px 6px 0px 0px #ed1c24', width: "17rem", cursor: "pointer" }}
          onClick={() => {
            setLoading(true)
            router.push("Customer/PayBill");
          }}
        >
          <img
            style={{ height: "6rem", width: "36%", margin: '2rem 5rem' }}
            src="/Pay-Bill.png"
            class="card-img"
            alt="..."
          />
          <div class=" " >
            <h5
              class="card-title"
              style={{ color: "black", textAlign: "center" }}
            >
              Pay Bill
            </h5>
            <p style={{ textAlign: "center" }} class="card-text">
              <small>Click here to Pay Property tax</small>
            </p>
          </div>
        </div> */}

        <div
          class="card my-3"
          style={{ boxShadow: '0px 6px 0px 0px #ed1c24', width: "17rem", cursor: "pointer" }}
          onClick={() => {
            setLoading(true)
            router.push("Customer/PayLicenseBill");
          }}
        >
          <img
            style={{ height: "6rem", width: "36%", margin: '2rem 5rem' }}
            src="/Pay-Bill.png"
            class="card-img"
            alt="..."
          />
          <div class=" " >
            <h5
              class="card-title"
              style={{ color: "black", textAlign: "center" }}
            >
              Pay Licence Bill
            </h5>
            <p style={{ textAlign: "center" }} class="card-text">
              <small>Click here to Pay Licence Bill</small>
            </p>
          </div>
        </div> 



        <div
          class="card my-3"
          style={{ boxShadow: '0px 6px 0px 0px #12c27a', width: "17rem", cursor: "pointer" }}
          onClick={() => {
            setLoading(true)
            router.push("Customer/CustomerDetails");
          }}
        >
          <img
            style={{ height: "6rem", width: "36%", margin: '2rem 5rem' }}
            src="/My-Details.png"
            class="card-img"
            alt="..."
          />
          <div class="">
            <h5
              class="card-title"
              style={{ color: "black", textAlign: "center" }}
            >
              My Details
            </h5>
            <p style={{ textAlign: "center" }} class="card-text">
              <small>Click here to view your details</small>
            </p>
          </div>
        </div>
        {/* <div
          class="card my-3"
          style={{ boxShadow: '0px 6px 0px 0px purple', width: "17rem", cursor: "pointer" }}
          onClick={() => {
            setLoading(true)
            router.push("Customer/BillHistory");
          }}
        >
          <img
            style={{ height: "6rem", width: "36%", margin: '2rem 5rem' }}
            src="/Bill History.png"
            class="card-img"
            alt="..."
          />
          <div class="">
            <h5
              class="card-title"
              style={{ color: "black", textAlign: "center" }}
            >
              Bill History
            </h5>
            <p style={{ textAlign: "center" }} class="card-text">
              <small>Click here to view your Bill History</small>
            </p>
          </div>
        </div> */}
        {/* <div
          class="card my-3"
          style={{ boxShadow: '#ed1e79 0px 6px 0px 0px', width: "17rem", cursor: "pointer" }}
          onClick={() => {
            setLoading(true)
            router.push("Customer/PayPermitBill");
          }}
        >
          <img
            style={{ height: "6rem", width: "36%", margin: '2rem 5rem' }}
            src="/Pay Permit Bill.png"
            class="card-img"
            alt="..."
          />
          <div class=" " >
            <h5
              class="card-title"
              style={{ color: "black", textAlign: "center" }}
            >
              Pay Permit Bill
            </h5>
            <p style={{ textAlign: "center" }} class="card-text">
              <small>Click here to Pay Permit tax</small>
            </p>
          </div>
        </div> */}
        <div
          class="card my-3"
          style={{ boxShadow: '#f7931e 0px 6px 0px 0px', width: "17rem", cursor: "pointer" }}
          onClick={() => {
            setLoading(true)
            router.push("Reciept");
          }}
        >
          <img
            style={{ height: "6rem", width: "36%", margin: '2rem 5rem' }}
            src="/Get-Receipt.png"
            class="card-img"
            alt="..."
          />
          <div class=" " >
            <h5
              class="card-title"
              style={{ color: "black", textAlign: "center" }}
            >
              Get Receipt
            </h5>
            <p style={{ textAlign: "center" }} class="card-text">
              <small>Click here to Get Receipt</small>
            </p>
          </div>
        </div>
        <div
          class="card my-3"
          style={{ boxShadow: '#326f67 0px 6px 0px 0px', width: "17rem", cursor: "pointer" }}
          onClick={() => {
            setLoading(true)
            router.push("Customer/ViewComplaint");
          }}
        >
          <img
            style={{ height: "6rem", width: "36%", margin: '2rem 5rem' }}
            src="/View-Your-Complaint.png"
            class="card-img"
            alt="..."
          />
          <div class=" " >
            <h5
              class="card-title"
              style={{ color: "black", textAlign: "center" }}
            >
              View your complaint
            </h5>
            <p style={{ textAlign: "center" }} class="card-text">
              <small>Click here to Pay License tax</small>
            </p>
          </div>
        </div>

       
      </div>

      {children}
      <div
          style={{
            height: "26vh",
            width: "90vw",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            overflow: "auto",
            margin: "auto",
            padding:"6px"
          }}
        >
          <div style={{ boxShadow: "8px 8px #e6e6e6" }}>
            <img style={{ height: "8rem" }} src="/Digital-India.png" alt="" />
          </div>
          <div style={{ boxShadow: "8px 8px #e6e6e6" }}>
            <img style={{ height: "8rem" }} src="/MAKE-IN-INDIA.png" alt="" />
          </div>
          <div style={{ boxShadow: "8px 8px #e6e6e6" }}>
            <img style={{ height: "8rem" }} src="/india.gov.in.png" alt="" />
          </div>
          <div style={{ boxShadow: "8px 8px #e6e6e6" }}>
            <img
              style={{ height: "8rem" }}
              src="/GOI-Web-Directory.png"
              alt=""
            />
          </div>
          <div style={{ boxShadow: "8px 8px #e6e6e6" }}>
            <img style={{ height: "8rem" }} src="/data.gov.in.png" alt="" />
          </div>
          <div style={{ boxShadow: "8px 8px #e6e6e6" }}>
            <img style={{ height: "8rem" }} src="/My-Gov.png.png" alt="" />
          </div>
        </div>
      <div className="footer"
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: 320,
          marginX: "2px",
        }}
      >
        <div
          className="footmob"
          style={{ width: "50rem", color: "white", display: "grid" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              color: "#eb9322",
              alignItems: "center",
            }}
          >
            <img src="/Icons & Images/BALLIA,-Uttar-Pradesh-White-Logo.png" style={{ height: "70px" }} />
          </div>
          <div
            style={{
              width: "24rem",
              color: "white",
              paddingLeft: "2rem",
              height: "8rem",
            }}
          >
            <h6>
              <img src="./Home32.png" width={20}></img> Uttar Pradesh
            </h6>
            <h6>
              <img src="./Contact32.png" width={20}></img> 0253-2530227
            </h6>
            <h6>
              <img src="./Email32.png" width={20}></img> Uttarpradesh@gmail.com
            </h6>
            <h6>
              <img src="./x32.png" width={30}></img>
              <img src="./F32.png" width={30}></img>
              <img src="./in32.png" width={30}></img>
              <img src="./YouTube32.png" width={30}></img>
            </h6>
            <br />
          </div>
        </div>
        <div style={{ width: "70rem", color: "white", paddingTop: "6rem" }}>
          <ul style={{ padding: "2rem" }}>
            <li>
              <h6>Privacy Policy</h6>
            </li>
            <li>
              <h6>Terms and Conditions</h6>
            </li>
            <li>
              <h6>Contact Us</h6>
            </li>
            <li>
              <h6>Refund and Cancellation Policy</h6>
            </li>
            <li>
              <h6> Visitor Analytics</h6>
            </li>
          </ul>
        </div>
        <div style={{ width: "70rem", color: "white", paddingTop: "6rem" }}>
          <ul style={{ padding: "2rem" }}>
            <li>
              <h6>FAQ</h6>
            </li>
            <li>
              <h6>Disclaimer</h6>
            </li>
            <li>
              <h6>Feedback </h6>
            </li>
            <li>
              <h6> Web Information Manager</h6>
            </li>
          </ul>
        </div>
        <div className="container" style={{ paddingTop: "6rem" }}>
          <iframe
 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57490.94485721184!2d84.10792128221753!3d25.76448355159981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399264de6d336a87%3A0xd8d5251dac89a330!2sBallia%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1734003275723!5m2!1sen!2sin"            height="200"
            style={{ border: "4px solid white" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div style={{ background: "#e40713" }}>
        <div style={{ padding: "5px 20px 5px 20px", color: "white" }}>
          <div>
            <span>
            Website Content Managed by Nagar Palika Parishad ,Uttarpradesh government
              <br />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
