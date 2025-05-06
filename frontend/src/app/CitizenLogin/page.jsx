"use client"
import React, { useState, useContext } from "react"
import { useCookies } from "react-cookie";
import { Customer } from '@/app/AdminContext/CustomerManagement'
export default function CitizenLogin() {
    const { CitizenLogin } = useContext(Customer)
    const [showPassword, setShowPassword] = useState(false);


    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [cookies, setCookie, removeCookie] = useCookies();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }
    async function submitform(e) {
        e.preventDefault()
        let data = await CitizenLogin(formData);
        if (data && typeof window !== 'undefined') {
            window.location.href = './CitizenLogin/otp';
        } else {
            alert('Invalid login data received');
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


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
                            <p className="fw-normal" style={{ paddingTop: '3rem', textAlign: 'center' }}><b>To continue, please enter your email address and password</b></p>
                        </div>
                        <form onSubmit={submitform} style={{ marginTop: '3rem', }}>
                            <div >
                                <label >Email Address</label>
                                <input type="email" placeholder="Enter Email Address" onChange={handleChange} name="email" style={{ width: "100%", height: "60px", border: "1px solid #B1B6C6", outline: "none", borderRadius: "16px", paddingLeft: "19px", marginTop: "5px" }} value={formData.email} /><br />
                            </div>
                            <div className="my-3">
                                <label >Password</label><br />
                                <input type="password" placeholder="Enter Password" onChange={handleChange} name="password" style={{ width: "100%", height: "60px", border: "1px solid #B1B6C6", outline: "none", borderRadius: "16px", paddingLeft: "19px", marginTop: "5px" }} value={formData.password} />
                            </div>
                            <div>
                                <h4 style={{ textAlign: 'center', margin: '3rem' }}>Forget Password?</h4>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button className="fw-bold" type="submit" style={{ height: '60px', width: '374px', textAlign: 'center', backgroundColor: 'rgb(165 182 237)', color: '#FFFFFF', borderRadius: '3rem', border: 'none' }}><b>Login</b></button>
                            </div>
                            <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
                                I don’t have an account? Sign Up?
                                <a href="/CitizenSignup" style={{ color: 'red' }}>Sign Up</a>
                            </div>
                        </form>
                    </div>
                </div>
                <div>
                    <img src="/loginsliderimg.png" />
                </div>
            </div> */}



            <div className="col-12 ps-0">
                <div className="row">

                    <div className="col-7 ps-0">
                        <div className="ps-0" style={{
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
                                    <p className="fw-bold my-auto" style={{ fontSize: "16px", color: "#9EA8B2" }}>To Continue please enter email address and password</p>
                                </div>


                                <div className="col-12 m-auto">
                                    <form onSubmit={submitform}>

                                        <div className="col-12 my-3">
                                            <label className="col-12 fw-bold">Email Address</label>

                                            <div className="col-12 px-3">
                                                <input className="col-12 py-2 px-2" type="email" placeholder="Enter Email Address" onChange={handleChange} name="email" value={formData.email}
                                                    style={{ border: 'none', borderBottom: "1px solid black", backgroundColor: "#FFF6CD" }}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12 my-3">
                                            <label className="col-12 fw-bold" >Password</label>

                                            <div className="col-12 px-3">
                                                <input className="col-12 py-2 px-2" type={showPassword ? "text" : "password"} placeholder="Enter Password" onChange={handleChange} name="password" value={formData.password}
                                                    style={{ border: 'none', borderBottom: "1px solid black", backgroundColor: "#FFF6CD" }}
                                                />

                                                <span
                                                    onClick={togglePasswordVisibility}
                                                    style={{
                                                        position: 'absolute',
                                                        right: '30px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        cursor: 'pointer',
                                                        fontSize: '18px',
                                                        display: "flex",
                                                    }}
                                                >
                                                    <img

                                                        src={showPassword ? "/View32.png" : "/View-Hide32.png"}
                                                        style={{
                                                            width: '60%',
                                                            cursor: 'pointer'
                                                        }}
                                                        // onClick={togglePassword}
                                                        alt=" Password Visibility"
                                                    />
                                                </span>

                                            </div>
                                        </div>

                                        {/* <div className="col-12 text-end my-3">
                                            <p className="text-danger "><ins>Forget Password?</ins></p>
                                        </div> */}

                                        <div className="col-12 text-center my-4" >
                                            <button
                                                className="col-10"
                                                type="submit"
                                                style={{
                                                    borderRadius: "50px", border: "none", fontSize: "23px",
                                                    color: "white", fontWeight: "400", padding: "8px 20px",
                                                    background: "linear-gradient(to right , #F1881B , #F1881B , #F0711C , #EF4E1E)"

                                                }}
                                            >Login &gt;&gt;
                                            </button>
                                        </div>

                                        <div className="col-12 my-3">
                                            <p className="text-center">
                                                I don’t have an account ?
                                                <a href="/CitizenSignup" className="text-danger"><ins>Sign Up</ins></a>
                                            </p>
                                        </div>
                                    </form>
                                </div>

                            </div>


                        </div>
                    </div>


                </div>
            </div>


        </>

    )
}