"use client";
import React, { useEffect } from "react";
import Link from "next/link";

const FirstNav = () => {
  return (
    <>
      <section
        style={{
          // backgroundColor: "#4096a3",
          backgroundImage: "linear-gradient(#4096a3,rgb(132, 206, 216))",
          color: "white",
          padding: "12px",
          fontSize: "16px",
        }}
        data-aos="fade-in"
      >
        <marquee>
          <div
            style={{
              color: "white",
              fontSize: "20px",
              alignItems: "center",
            }}
          >
              <strong>✦ नगर पालिका परिषद् बलिया  </strong>उत्तर प्रदेश सरकार की वेबसाइट
            में आपका स्वागत है। ✦ <strong> नगर पालिका परिषद् बलिया  </strong>उत्तर
            प्रदेश सरकार की वेबसाइट में आपका स्वागत है। ✦
            <strong> नगर पालिका परिषद् बलिया  </strong>उत्तर प्रदेश सरकार की वेबसाइट
            में आपका स्वागत है। ✦
          </div>
        </marquee>
      </section>
    </>
  );
};

export default FirstNav;
