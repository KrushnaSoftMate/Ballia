import React from "react";
import "./LandingPage.css";

const Footer = () => {
  return (
    <>
      <div
        className="footer"
        id="footer"
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: 320,
          marginX: "2px",
        }}
      >
        <div
          className="footmob"
          style={{ width: "50rem", color: "white", display: "grid" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              color: "#eb9322",
              alignItems: "center",
            }}
          >
            <img
              src="/Icons & Images/BALLIA,-Uttar-Pradesh-White-Logo.png"
              style={{ height: "70px" }}
            />
          </div>
          <div
            style={{
              width: "24rem",
              color: "white",
              paddingLeft: "9rem",
              height: "8rem",
            }}
          >
            <h6>
              <img src="./Home32.png" width={20}></img> बलिया
            </h6>
            <h6>
              <img src="./Contact32.png" width={20}></img> 
            </h6>
            <h6>
              <img src="./Email32.png" width={20}></img> 
            </h6>
            {/* <h6>
              <img src="./x32.png" width={30}></img>
              <img src="./F32.png" width={30}></img>
              <img src="./in32.png" width={30}></img>
              <img src="./YouTube32.png" width={30}></img>
            </h6> */}
            <br />
          </div>
        </div>
        <div style={{ width: "70rem", color: "white", paddingTop: "6rem" }}>
        <ul style={{ padding: "2rem" }}>
            <li>
              <h6><a style={{ color: "white",textDecoration:"none" }}  href="/PropertyTax/PrivacyPolicy">गोपनीयता नीति</a></h6>
            </li>
            <li>
              <h6><a style={{ color: "white",textDecoration:"none" }}  href="/LandingPage/WebsitePolicies">नियम और शर्तें</a></h6>
            </li>
            <li>
              <h6><a style={{ color: "white",textDecoration:"none" }}  href="/LandingPage/ContactUs">हमसे संपर्क करें</a></h6>
            </li>
            {/* <li>
              <h6>धनवापसी और रद्दीकरण नीति</h6>
            </li> */}
            {/* <li>
              <h6> विज़िटर एनालिटिक्स</h6>
            </li> */}
          </ul>
        </div>
        <div style={{ width: "70rem", color: "white", paddingTop: "6rem" }}>
        <ul style={{ padding: "2rem" }}>
            {/* <li>
              <h6>अक्सर पूछे जाने वाले प्रश्न</h6>
            </li> */}
            <li>
              <h6><a style={{ color: "white",textDecoration:"none" }}  href="/LandingPage/Disclaimer">अस्वीकरण</a></h6>
            </li>
            <li>
              <h6><a style={{ color: "white",textDecoration:"none" }} href="/LandingPage/Feedback">प्रतिक्रिया</a></h6>
            </li>
            {/* <li>
              <h6>वेब सूचना प्रबंधक</h6>
            </li> */}
          </ul>
        </div>
        <div className="container" style={{ paddingTop: "6rem" }}>
          <iframe
       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57490.94485721184!2d84.10792128221753!3d25.76448355159981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399264de6d336a87%3A0xd8d5251dac89a330!2sBallia%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1734003275723!5m2!1sen!2sin"
            width="85%"
            height="200"
            style={{ border: "4px solid white" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div style={{ background: "#a50400" }}>
        <div
          style={{
            padding: "5px 20px 5px 20px",
            color: "white",
            fontSize: "18px",
          }}
        >
          <div>
            <span>
              Website Content Managed by Ballia Nagar Palika Parishad ,Uttar Pradesh
              Government
              <br />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
