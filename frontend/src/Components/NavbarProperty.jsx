'use client'
import React, { useEffect, useState } from 'react'
import {usePathname } from 'next/navigation'
const NavbarProperty = () => {

   let p=usePathname() 
    const[tagname,settagname]=useState(null)
    
    // useEffect(()=>{
    //     settagname(p)
    // },[])
  return (
    <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          
          <a className="navbar-brand" href="/Customer">
          <img src="/BALLIA-Logo512.png" style={{ height: '50px' }}></img>
          {"   "}Property Tax
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
  )
}

export default NavbarProperty