"use client";
import React, { useContext, useState } from 'react'
import { useCookies } from "react-cookie";
import Link from 'next/link';
import './page.css'
import { Admin } from '@/app/AdminContext/AdminManageMent'
import { useEffect } from 'react';


const Page = () => {
    const { AdminLogin, getcaptcha, validatecaptcha } = useContext(Admin)
    const [unqid, setuniqid] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies();
    const [loginform, setLoginForm] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => { captchaManager() }, [])
    const captchaManager = async (e) => {
        const d = await getcaptcha()
        document.getElementById('captcha').innerHTML = d.captchad
        setuniqid(d.id)
    }
    async function LoginData(e) {
        e.preventDefault();
        setLoading(true);
        let text = document.getElementById('captchatext').value;
        console.log(text);

        try {
            const captchacheck = await validatecaptcha(unqid, text);

            if (JSON.parse(captchacheck) === true && unqid) {
                try {
                    let data = await AdminLogin(loginform);
                    if (data && typeof window !== 'undefined') {
                        window.localStorage.setItem('AuthUser', data);
                        setCookie('AuthUser', data, { path: '/' });
                        window.location.href = '/Admin';
                        setLoading(false)
                    } else {
                        setLoading(false)
                        alert('Invalid login data received');
                        captchaManager()

                        // window.location.href ='/ErrorPages/Error500';


                    }
                } catch (error) {
                    console.error('AdminLogin failed:', error);
                    setLoading(false)
                    alert('Login failed: ' + error.message);
                    captchaManager()
                    // window.location.href = '/ErrorPages/Error500';
                }
            } else {
                alert('Captcha validation failed');
                captchaManager()

            }
        } catch (error) {
            console.error('Captcha validation failed:', error);
            alert('Captcha validation failed: ' + error.message);
            captchaManager()
        }

        setLoading(false);
    }

    const handleEmailChange = (e) => {
        const { id, value } = e.currentTarget;
        const safeEmailCharacters = /^[a-zA-Z0-9@._-]*$/; // Allow only safe characters for email

        if (!safeEmailCharacters.test(value)) {
            alert("Only safe characters are allowed in the email address.");
            return;
        }

        setLoginForm({ ...loginform, [id]: value });
    };
    function PasswordManager(e) {
        let input = e.currentTarget.parentNode.children[0]
        let eye = e.currentTarget.parentNode.children[1]
        input.type === 'password' ? input.type = 'text' : input.type = 'password'
        eye.className === "fa-regular fa-eye" ? eye.className = "fa-regular fa-eye-slash" : eye.className = "fa-regular fa-eye"
    }
    return (
        <>
            <div style={{ backgroundColor: 'white', height: '100vh', width: '100vw', backgroundSize: 'cover', display: 'flex', justifyContent: 'space-between' }}>
                <img src="/Billia-Property-tax---Login-page.png" style={{ width: '60%' }} alt="Logo" />
                <div style={{ display: 'flex', height: '100vh', alignItems: 'center', width: "40%", justifyContent: "center" }}>
                    {
                        loading ? (<div style={{ display: "grid", justifyContent: "center", position: "absolute", zIndex: "10", top: "10vh", width: "100vw" }}>
                            <div className="loader" style={{ alignSelf: "center", justifySelf: "center" }}></div>
                            {/* <h2>Loading.......</h2> */}
                        </div>) : ''
                    }
                    <form onSubmit={LoginData} style={{ padding: "20px", width: "80%" }}>
                        <div className="form-group my-3" style={{ backgroundColor: 'rgba(135, 147, 189, 0)', border: 'none' }}>
                            <div className="panel-body">
                                <div>
                                    <h2 style={{ textAlign: 'center', color: '#f1772e' }}><b>Sign in to Property Tax</b></h2>
                                    {/* <h5 style={{ textAlign: 'center', color: '#999999' }}>Please enter your details</h5> */}
                                </div>
                                <div style={{ marginTop: '40px' }}>
                                    <p style={{ position: 'relative', backgroundColor: 'transparent', zIndex: '0', fontSize: '12px' }}><b>Email Address</b></p>
                                    <input autoComplete='off' style={{ border: 'none', borderRadius: '0', borderBottom: '2px solid' }} type="email" className="form-control" id="Username" value={loginform.Username || ''} required onChange={handleEmailChange} maxLength={50} />
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <p style={{ position: 'relative', backgroundColor: 'transparent', fontSize: '12px' }}><b>Password</b></p>
                                    <div style={{ display: 'flex', alignItems: 'center', borderRadius: '10px', backgroundColor: 'white', position: 'relative', background: 'transparent', marginRight: '10px' }}>
                                        <input autoComplete='off' style={{ border: 'none', borderRadius: '0', borderBottom: '2px solid' }} type="password" className="form-control" id="Password" required onChange={(e) => setLoginForm({ ...loginform, [e.currentTarget.id]: e.target.value })} maxLength={20} />
                                        <i style={{ position: "relative", right: "20px" }} className="fa-regular fa-eye" onClick={(e) => PasswordManager(e)}> </i>
                                    </div>
                                </div>
                                <div style={{ marginTop: '20px', display: 'flex', flexWrap: "wrap" }}>
                                    <div id='captcha' about=''>CAptcha</div>
                                    <div>
                                        <input className='form-control' id='captchatext' placeholder='Please Enter Captcha' onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
                                        }} maxLength={6} required></input>
                                    </div>
                                </div>
                                {/* <div>
                                    <p style={{ textAlign: "right" }} className='my-2'><Link href="ForgetPassword" style={{ textDecoration: "none", color: "#999999" }}>Forgot Password?</Link></p>
                                </div> */}
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                                    <button type="submit" className="btn btn-primary" style={{ padding: '10px', width: '50%', border: '1px solid #f1772e', borderRadius: '20px', backgroundColor: '#f1772e' }}>Log In »</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Page;