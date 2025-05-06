"use client"
import React, { useState, useContext, useEffect } from "react"
import { useCookies } from "react-cookie";
import { Customer } from '@/app/AdminContext/CustomerManagement';
const page = () => {
    const { sendSms, verifyOtp } = useContext(Customer)
    const [cookies, setCookie] = useCookies();
    const [phone, setphone] = useState();
    const [otp, setotp] = useState();
    const [enterOTP, setEnterOTP] = useState(false);
    const [resend, setResent] = useState(0);
    const [showResend, setShowResend] = useState(false);

    const handleChange = (e) => {
        setphone(e.target.value);
    }
    const handleSubmit = async (e) => {
        let otp1 = Math.floor(100000 + Math.random() * 900000).toString();
        e.preventDefault();
        let data = await sendSms(phone, otp1);
        if (data) {
            alert("OTP Sent Successfully!");
            setEnterOTP(true);
            return;
        } else {
            return alert("Failed to send OTP. Try again.");
        }
    }
    const handleChangeotp = (e) => {
        setotp(e.target.value)
    }

    async function verifyOtp1(e) {
        e.preventDefault();
        if (!phone || !otp) {
            return alert("OTP or Phone Number not Provided !!");
        }
        try {
            let data = await verifyOtp(phone, otp);
            alert(data);
            if (data == "OTP Verified Successfully !!!") {
                let token = window.localStorage.getItem("Citizen");
                setCookie("Citizen", token, { path: "/" });
                alert("Verification successful!");
                window.location.href = "/Citizen/Dashboard";
            } else {
                alert(data);
                setShowResend(true);
            }
        }
        catch (err) {
            console.log(err);
            alert(err);
        }
    }



    useEffect(() => {
        if (enterOTP) {
            setShowResend(false);
            const timer = setTimeout(() => {
                setShowResend(true);
            }, 60000); // 1 minute

            return () => clearTimeout(timer);
        }
    }, [enterOTP]);



    return (
        <>

            {/* <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
                <div style={{ width: '600px', borderRadius: '20px', boxShadow: '1px 3px 7px', height: '55rem', padding: '30px', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: "9px", gap: '7px' }}>
                        <img src="/BALLIA-Logo512.png" alt="Logo" style={{ width: '5rem', height: '5rem' }} /><br />
                        <h5 style={{ width: '15rem', height: '5rem', marginTop: "1rem" }}>BALLIA MUNICIPAL CORPORATION</h5>
                    </div>
                    <div className="mt-10" style={{ marginTop: '2rem' }}>
                        <h1 className="fw-bold" style={{ textAlign: 'center' }}>Customer Login</h1>
                        <p className="fw-normal" style={{ paddingTop: '3rem', textAlign: 'center' }}><b>To continue, please enter your mobile number to get the OTP</b></p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label >Enter Mobile Number</label>
                            <input type="text" placeholder="Enter Mobile Number" onChange={handleChange} name="phone" style={{ width: "100%", height: "60px", border: "1px solid #B1B6C6", outline: "none", borderRadius: "16px", paddingLeft: "19px", marginTop: "5px" }} value={phone} required /><br />
                        </div>
                        <div className="my-3">
                            <div style={{ display: 'flex', justifyContent: 'center' }} className="row my-3">
                                <button className="fw-bold" type="submit" style={{ height: '60px', width: '200px', textAlign: 'center', backgroundColor: 'rgb(165 182 237)', color: '#FFFFFF', borderRadius: '3rem', border: 'none' }}>Send OTP</button>
                                <button className="my-3" type="submit" style={{ height: '20px', textAlign: 'center', backgroundColor: "transparent", border: 'none' }}>Resend OTP?</button>
                            </div>
                        </div>
                    </form>
                    <div className="my-3">
                        <label >Enter OTP</label><br />
                        <input type="text" placeholder="Enter OTP here" value={otp} onChange={(e) => { handleChangeotp(e) }} name="otp" style={{ width: "100%", height: "60px", border: "1px solid #B1B6C6", outline: "none", borderRadius: "16px", paddingLeft: "19px", marginTop: "5px" }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }} className=" my-3">
                        <button className="fw-bold" type="button" onClick={verifyOtp1} style={{ height: '60px', width: '200px', textAlign: 'center', backgroundColor: 'rgb(165 182 237)', color: '#FFFFFF', borderRadius: '3rem', border: 'none' }}>Verify OTP</button>
                    </div>
                </div>
            </div>
            <div>
                <img src="/loginsliderimg.png" />
            </div>
        </div> */}





            <div className="col-12 ps-0">
                <div className="row">

                    <div className="col-7 ps-0">
                        <div className=" ps-0" style={{
                            width: "90%",
                            height: "100vh",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            borderTopRightRadius: "190px",
                            borderBottomRightRadius: "190px",
                        }}>
                            <img src="/LoginsignupdesignforLandingPage.png" className="d-block" style={{ width: "100%", height: "100%" }} />

                        </div>
                    </div>

                    <div className="col-5 my-auto">


                        <div className="col-12">

                            <div className="col-10 m-auto py-4" style={{
                                boxShadow: "0px 0px 8px 2px rgba(0, 0, 0, 0.74)",
                                borderRadius: "20px"
                            }}>
                                <div className="col-12 m-auto">
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <div>
                                            <img src="/BALLIA-Logo512.png" alt="Logo" style={{ width: '5rem', height: '5rem' }} />
                                            <br />
                                        </div>

                                        <p className="my-auto ms-2" style={{ width: "40%", fontSize: "18px", fontWeight: "700" }}>
                                            BALLIA MUNICIPAL CORPORATION
                                        </p>

                                    </div>
                                </div>

                                <div className="col-9 m-auto text-center my-4">
                                    <h3 className="fw-bold">Customer Login</h3>
                                    <p className="fw-bold my-auto" style={{ fontSize: "16px", color: "#9EA8B2" }}>To continue, please enter your mobile number to get the OTP</p>
                                </div>


                                <div className="col-12 m-auto">

                                    {
                                        !enterOTP &&
                                        (
                                            <>
                                                <form onSubmit={handleSubmit}>

                                                    <div className="col-12 my-3">
                                                        <label className="col-12 fw-bold">Enter Mobile Number</label>

                                                        <div className="col-12 px-3">
                                                            <input className="col-12 py-2 px-2" type="text" placeholder="Enter Mobile Number" onChange={handleChange} value={phone} required
                                                                style={{ border: 'none', borderBottom: "1px solid black", backgroundColor: "#FFF6CD" }}
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="col-12 text-center my-4" >
                                                        {
                                                            resend == 0 &&
                                                            <button
                                                                className="col-10 bg-warning"
                                                                type="submit"
                                                                style={{
                                                                    borderRadius: "50px", border: "none", fontSize: "20px",
                                                                    color: "white", fontWeight: "400", padding: "7px 20px",
                                                                    background: "linear-gradient(to right , #F1881B , #F1881B , #F0711C , #EF4E1E)"

                                                                }}
                                                            >Send OTP
                                                            </button>
                                                        }
                                                        {
                                                            resend == 1 &&
                                                            <button
                                                                className="col-10 bg-danger"
                                                                type="submit"
                                                                style={{
                                                                    borderRadius: "50px", border: "none", fontSize: "20px",
                                                                    color: "white", fontWeight: "400", padding: "7px 20px",
                                                                    // background: "linear-gradient(to right , #F1881B , #F1881B , #F0711C , #EF4E1E)"

                                                                }}
                                                            >Resend OTP
                                                            </button>
                                                        }
                                                    </div>

                                                    {/* <div className="col-12 text-end my-3">
                                                        <p className="text-danger"><ins style={{ cursor: "pointer" }}> Resend OTP ?</ins></p>
                                                    </div> */}
                                                </form>

                                            </>
                                        )

                                    }


                                    {
                                        enterOTP &&
                                        (
                                            <>
                                                <form action="">

                                                    <div className="col-12 my-3">
                                                        <label className="col-12 fw-bold">Enter OTP</label>

                                                        <div className="col-12 px-3">
                                                            <input className="col-12 py-2 px-2" type="text" placeholder="Enter OTP here" onChange={(e) => { handleChangeotp(e) }} value={otp} name="otp" required
                                                                style={{ border: 'none', borderBottom: "1px solid black", backgroundColor: "#FFF6CD" }}
                                                            />
                                                        </div>
                                                    </div>



                                                    <div className="col-12 text-center my-4" >
                                                        <button
                                                            className="col-10 bg-success"
                                                            type="button"
                                                            onClick={verifyOtp1}
                                                            style={{
                                                                borderRadius: "50px", border: "none", fontSize: "20px",
                                                                color: "white", fontWeight: "400", padding: "7px 20px",
                                                            }}
                                                        >Verify OTP
                                                        </button>
                                                    </div>

                                                    {
                                                        showResend &&
                                                        <div className="col-12 text-end my-3">
                                                            <p className="text-danger" onClick={(e) => { e.preventDefault(); setEnterOTP(false); setResent(1) }}><ins style={{ cursor: "pointer" }}>Resend OTP ?</ins></p>
                                                        </div>
                                                    }


                                                </form>
                                            </>
                                        )
                                    }
                                </div>

                            </div>


                        </div>
                    </div>


                </div>
            </div>

        </>
    )
}

export default page