'use client'
import React, { useContext, useState } from 'react'
import { Customer } from '@/app/AdminContext/CustomerManagement'
import NavbarProperty from '@/Components/NavbarProperty'
const page = (props) => {

  const [PropertyID, SetPropertyID] = useState('')
  const statecalls = useContext(Customer)
  const { GetReciept, GetPermitReciept } = statecalls
  async function FetchReciept(e) {
    e.preventDefault()

    if (PropertyID) {
      const data = await GetReciept(PropertyID);
      const data1 = await GetPermitReciept(PropertyID);
      if (data.length > 0 || data1.length > 0) {
        window.location.href = `/Reciept/${PropertyID}`
      } else {
        alert("Please Enter Correct Property ID / Bill Number")
      }
    } else {
      alert("Please Enter Property ID / Bill Number")
    }
  }

  return (
    <>
      <NavbarProperty />
      <div
        style={{ height: '50vh', display: "grid", justifyContent: "center", alignItems: 'center', backgroundImage: 'url(/Property-Banner.png)', backgroundSize: 'cover' }}
      >
        <div>
          <h1 style={{ textAlign: 'center', color: "white" }}>Get Receipt</h1>
        </div>

        <div style={{ padding: "50px" }}>
          <form onSubmit={FetchReciept}>
            <label className='form-label' style={{ color: "white" }}>Property ID / Bill Number</label>
            <input className='form-control' type='text' id='PropertyID' placeholder='Enter PropertyID or BillNumber' onChange={(e) => SetPropertyID(e.target.value)} />
            <button type='submit' className='btn btn-success form-control my-3' style={{ backgroundColor: "#ec931f", border: "none", color: "white" }}>Submit</button>
          </form>
        </div>
      </div>

    </>
  )
}

export default page
