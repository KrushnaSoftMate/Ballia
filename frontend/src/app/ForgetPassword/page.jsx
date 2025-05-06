'use client'
import Link from 'next/link';
import React, { useState } from 'react'

const Page = () => {
  const [email, setEmail] = useState('');


  return (
    <>

      <div style={{ backgroundColor: 'white', height: '100vh', width: '100vw', backgroundSize: 'cover', display: 'flex' }}>
        <img src="/loginimage.png" style={{ width: '60%' }} alt="Login Logo" />
        <div style={{ display: 'flex', height: '100vh', alignItems: 'center', width: "40%", justifyContent: "center" }}>
          <form style={{ padding: "20px", width: "80%" }}>
            <div className="form-group my-3" style={{ backgroundColor: 'rgba(135, 147, 189, 0)', border: 'none' }}>
              <div className="panel-body">
                <div>
                  <span style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src="/Forgot-Password.png" alt="Forgot Password" />
                  </span>
                  <h2 style={{ textAlign: 'center', color: '#f1772e' }}><b>Forgot Password?</b></h2>
                  <h5 style={{ textAlign: 'center', color: '#999999' }}>Enter your registered email address, and we will help you Set up a new password.</h5>
                </div>
                <div style={{ marginTop: '40px' }}>
                  <p style={{ position: 'relative', backgroundColor: 'transparent', zIndex: '0', fontSize: '12px' }}><b>Email Address</b></p>
                  <div style={{ display: 'flex', alignItems: 'center', borderRadius: '10px', backgroundColor: 'white', position: 'relative', background: 'transparent', marginRight: '10px' }}>
                    <img src="/Email.png" style={{ height: "2rem", position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} alt="Mail Icon" />
                    <input style={{ border: 'none', borderRadius: '0', borderBottom: '2px solid' }} type="email" className="form-control" required onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                  <button type="submit" className="btn btn-primary" style={{ padding: '10px', width: '50%', border: '1px solid #f1772e', borderRadius: '20px', backgroundColor: '#f1772e' }}>CONTINUE »</button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <Link href="AdminLogin" style={{ color: '#f1772e' }}><u>Back to sign In</u></Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

    </>

  )
}

export default Page
