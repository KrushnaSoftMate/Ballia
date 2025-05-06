'use client'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const MainNav = () => {

    return (
        <>
            <div
        style={{
          display: "flex",
          justifyContent: "space-between", // Spread content across available space
          alignItems: "center", // Align items vertically in the center
          backgroundColor: "#a50400",
          color: "white",
          padding: "10px 20px",
        }}
      >
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap", // Ensure responsiveness
            listStyle: "none", // Remove bullet points
            padding: 0,
            margin: 0,
            gap: "25px",
          }}
        >
          <li>
            <a href="/" style={{ color: "white", textDecoration: "none" }}>
             <b>  होम</b>
            </a>
          </li>
          <li>
            <a
              href="#aboutus"
              style={{ color: "white", textDecoration: "none" }}
            >
           <b>   हमारे बारे में</b>
            </a>{" "}
          </li>

          {/* <li>
            <a
              href="#department"
              style={{ color: "white", textDecoration: "none" }}
            >
            <b>  विभाग </b>
            </a>
          </li> */}
          <li>
            <a
              href="#department"
              style={{ color: "white", textDecoration: "none" }}
            >
            <b>  सेवाएं </b>
            </a>
          </li>
          <li>
            <a
              href="#clients"
              style={{ color: "white", textDecoration: "none" }}
            >
             <b> ग्राहकों </b>
            </a>
          </li>
          <li>
            <a
              href="#gallary"
              style={{ color: "white", textDecoration: "none" }}
            >
           <b>   गैलरी </b>
            </a>
          </li>
          <li>
            <a
              href="#footer"
              style={{ color: "white", textDecoration: "none" }}
            >
          <b>    स्थान </b>
            </a>
          </li>
        </ul>
      <div style={{ display: "flex", gap: "10px" }}>
        <a
          href="./CitizenLogin"
          target='_blank'
          rel="noopener"
          style={{
            fontWeight:700,
            color: "white",
            textDecoration: "none",
            backgroundColor: "#ffcb00",
            padding: "11px",
            borderRadius: "10px",
            borderColor: "white",
            height: "3rem",
          }}
        >
          Citizen Login ↗
        </a>
        {/* <a
          href="../AdminLogin"
          rel="noopener"
          style={{
            fontWeight:700,
            color: "white",
            textDecoration: "none",
            backgroundColor: "#ffcb00",
            padding: "5px 10px",
            borderRadius: "10px",
            borderColor: "white",
            height: "3rem",
          }}
        >
          Admin Login ↗
        </a> */}
      </div>
      </div>
        </>
    )
}

export default MainNav