'use client'
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "./LandingPage.css";

const Header = () => {
  // useEffect(() => {
  //   const addGoogleTranslateScript = () => {
  //     const script = document.createElement("script");
  //     script.src =
  //       "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  //     script.async = true;
  //     document.body.appendChild(script);
  //   };

  //   window.googleTranslateElementInit = function () {
  //     new window.google.translate.TranslateElement(
  //       { pageLanguage: "hi" },
  //       "google_translate_element"
  //     );
  //   };

  //   if (!window.google) {
  //     addGoogleTranslateScript();
  //   } else {
  //     window.googleTranslateElementInit();
  //   }
  // }, []);
  if (typeof window != undefined) {
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
      );
    }
  }
  return (
    <header style={{
      marginBottom: "-2px",
      padding: "-10px",
      backgroundColor: "#f8f9fa",
    }}
      data-aos="fade-in">

      <div
        className="header_top"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ddd",
          backgroundColor: "#fde9d2",
        }}
      >
        <div
          // style={{
          //   display: "flex",
          //   flexDirection: "column",
          //   fontSize: "21px",
          //   color: "#333",
          //   lineHeight: "1.5",
          //   marginLeft: "2rem",
          // }}
          data-aos="fade-right"
          data-aos-duration="500"
        >
          {/* <div>
            <img src="/Mail1.png" alt="" style={{ width: "2rem" }} />
            <span
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "bold",
              }}
            >
              chunar[at]gmail[dot]com
            </span>
         
        </div> */}
        </div>
          
        {/* </div> */}
        {/* <div style={{ display: "flex", gap: "1rem" }}>
          <a href="https://x.com/?lang=en">
            <img src="/x-icon.png" alt="" style={{ width: "2rem" }} />
          </a>
          <a href="https://www.facebook.com">
            <img src="/Facebook1.png" alt="" style={{ width: "2rem" }} />
          </a>
          <a href="#">
            <img src="/linked-icon.png" alt="" style={{ width: "2rem" }} />
          </a>
          <a href="#">
            <img src="/youtube-icon.png" alt="" style={{ width: "2rem" }} />
          </a>
        </div> */}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "3px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "3px",
            flexWrap: "wrap",
            flex: "1 1 100%",
            marginLeft: "25px",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: "25px" }}
          >
            <a href="#">
              <img
                src="/Icons & Images/BALLIA,-Uttar-Pradesh-Logo.png"
                alt=""
                style={{
                  height: "85px",
                  width: "121%",
                  maxWidth: "500px",
                  objectFit: "contain"
                }}
              />
            </a>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <span id="google_translate_element"></span>
          </div>
          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              marginRight: "20px",
            }}
          >
            <img
              src="/icon1 (1).png"
              alt=""
              style={{ height: "60px", width: "100px" }}
            />
            <img
              src="/icon2 (1).png"
              alt=""
              style={{ height: "60px", width: "100px" }}
            />
            <img
              src="/icon3 (1).png"
              alt=""
              style={{ height: "60px", width: "100px" }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
