"use client";
import React, { useState, useContext } from 'react'
import { useCookies } from "react-cookie";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { backend } from '../paths'
import './page.css'
import { Agent } from '../AdminContext/AgentManagement';

const Page = () => {
    const router = useRouter();
    const agent = useContext(Agent)
    const [cookies, setCookie, removeCookie] = useCookies();
    const [loginform, setLoginForm] = useState({})
    const [loading, setLoading] = useState(false)

    async function LoginData(e) {
        e.preventDefault()
        setLoading(true)
        let data = await agent.AgentLogin(loginform)
        
        if (data && typeof window != undefined) {
            window.localStorage.setItem('AgentToken', data.token)
            setCookie('AgentToken', data.token, { path: '/' })
            alert('Login Successfull')
            window.location.href = '/Agent'
        } else {
            alert('Incorrect login')
            setLoading(false)
        }
    }

    function PasswordManager(e) {
        let input = e.currentTarget.parentNode.children[0]
        let eye = e.currentTarget.parentNode.children[1]
        input.type === 'password' ? input.type = 'text' : input.type = 'password'
        eye.className === "fa-regular fa-eye" ? eye.className = "fa-regular fa-eye-slash" : eye.className = "fa-regular fa-eye"
    }

    return (
        <>
            <div style={{ backgroundColor: 'white', height: '100vh', width: '100vw', backgroundSize: 'cover', display: 'flex', justifyContent: 'space-between' }}>
                <img src="/Login-Image.png" style={{ width: '60%' }} alt="Logo" />
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
                                    <h5 style={{ textAlign: 'center', color: '#999999' }}>Please enter your details</h5>
                                </div>
                                <div style={{ marginTop: '40px' }}>
                                    <p style={{ position: 'relative', backgroundColor: 'transparent', zIndex: '0', fontSize: '12px' }}><b>Email Address</b></p>
                                    <input style={{ border: 'none', borderRadius: '0', borderBottom: '2px solid' }} type="text" className="form-control" id="Email" required onChange={(e) => setLoginForm({ ...loginform, [e.currentTarget.id]: e.target.value })} />
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <p style={{ position: 'relative', backgroundColor: 'transparent', fontSize: '12px' }}><b>Password</b></p>
                                    <div style={{ display: 'flex', alignItems: 'center', borderRadius: '10px', backgroundColor: 'white', position: 'relative', background: 'transparent', marginRight: '10px' }}>
                                        <input style={{ border: 'none', borderRadius: '0', borderBottom: '2px solid' }} type="password" className="form-control" id="Password" required onChange={(e) => setLoginForm({ ...loginform, [e.currentTarget.id]: e.target.value })} />
                                        <i style={{ position: "relative", right: "20px" }} className="fa-regular fa-eye" onClick={(e) => PasswordManager(e)}> </i>
                                    </div>
                                </div>
                                <div>
                                    <p style={{ textAlign: "right" }} className='my-2'><Link href="AgentForgetPassword" style={{ textDecoration: "none", color: "#999999" }}>Forgot Password?</Link></p>
                                </div>
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