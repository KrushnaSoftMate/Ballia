"use client";
import Link from "next/link"; // Importing Link from Next.js
import { useEffect, useState } from "react";
import './layout.css'
// import CitizenLogin from "../CitizenLogin/page";

const Layout = ({ children }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const [Token, setToken] = useState('')
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let token = window.localStorage.getItem('Citizen')
      setToken(token)
      if (token != undefined) {
      } else {
        alert('please login')
        window.location.href = '/CitizenLogin'
      }
    }

    const addGoogleTranslateScript = () => {
      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );
    };

    if (!window.google) {
      addGoogleTranslateScript();
    } else {
      window.googleTranslateElementInit();
    };
  }, []);

  const toggleLogoutButton = () => {
    setShowLogout(prevState => !prevState);
  };
  const handleHover = (item) => {
    setHoveredItem(item);
  };

  const handleClick = (item) => {
    setActiveItem(item);
  };

  const styles = {
    menuItem: (isHovered, isActive) => ({
      display: "flex",
      gap: "1rem",
      color: isActive ? "white" : isHovered ? "black" : "black",
      alignItems: "center",
      padding: "10px 15px",
      fontSize: "1rem",
      width: "90%",
      height: "50px",
      borderRadius: "1rem",
      marginLeft: "2px",
      backgroundColor: isActive ? "#e40713" : isHovered ? "#f7a6a2" : "#fff",
      transform: isHovered ? "scale(1.05)" : "scale(1)",
      transition: "transform 0.2s ease, background-color 0.2s ease, color 0.2s ease",
    }),
    icon: (isHovered, isActive) => ({
      filter: isActive ? "brightness(0) invert(1)" : isHovered ? "brightness(0.8)" : "none", transition: "filter 0.2s ease",
    }),
  };

  const menuItems = [
    { name: "Dashboard", img: "/Dashboard.png", href: "/Citizen/Dashboard" },
    { name: "Property Tax Asset", img: "/Property-Tax-Asset-32.png", href: "/Citizen/PropertyTaxAsset" },
    // { name: "View Bill", img: "/Property-Tax-Asset-32.png", href: "/Citizen/ViewBill" },
    // { name: "Pay Bill", img: "/Property-Tax-Asset-32.png", href: "/Citizen/PayBill" },
    // { name: "Payment History", img: "/Property-Tax-Asset-32.png", href: "/Citizen/BillHistory" },
    { name: "Birth Certificate", img: "/Birth-Certificate-32.png", href: "/Citizen/BirthCertificateForm" },
    { name: "Death Certificate", img: "/Death-Certificate-32.png", href: "/Citizen/DeathCertificateForm" },
    // { name: "Marriage Certificate", img: "/Marriage-Certificate-32.png", href: "#" },
    { name: "Trade License Management", img: "/Trade-License-Management-32.png", href: "/Citizen/TradeLicenseManagement" },
    // {name:"Pay License Bill",img:"/Trade-License-Management-32.png",href:"/Citizen/PayLicenseBill"},
    // { name: "Citizen Complaints", img: "/Citizen-Complaints32.png", href: "/Citizen/CitizenComplaints" },
    // { name: "Wastage Collection", img: "/Wastage-Collection-32.png", href: "#" },

  ];

  return (
    <>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <aside style={{ width: "269px", height: "-webkit-fill-available", borderRight: "2px solid #DFEAF0", position: "fixed", backgroundColor: "#af737317", transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.8s ease", animation: "fadeIn 1s", zIndex: 1000, overflow: "auto", borderRadius: "18px", boxShadow: "2px 1px 5px 1px" }}>
          <div className="flex justify-end xl:hidden lg:flex md:flex" onClick={() => setSidebarOpen(false)}
            style={{ cursor: "pointer" }}>
          </div>
          <div style={{ textAlign: "center", paddingTop: "10px" }}>
            <img
              src="/BALLIA-Logo512.png"
              style={{ width: "9rem", height: "8rem", alignSelf: "center" }}
              alt="Nagar Palika Parishad Logo"
            />
          </div>
          <nav style={{ display: "grid", paddingTop: "30px", gap: "25px", paddingBottom: "20px", paddingLeft: "10px" }}
          >
            {Token && menuItems.map((item) => (
              <Link key={item.name} href={item.href} style={{ textDecoration: "none" }}>
                <div
                  style={styles.menuItem(hoveredItem === item.name, activeItem === item.name)}
                  onMouseEnter={() => handleHover(item.name)}
                  onMouseLeave={() => handleHover(null)}
                  onClick={() => handleClick(item.name)}
                >
                  <img
                    src={item.img}
                    alt={`${item.name} Icon`}
                    style={{ width: '25px', ...styles.icon(hoveredItem === item.name, activeItem === item.name) }}
                  />
                  <span><b>{item.name}</b></span>
                </div>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div style={{ flexGrow: 1 }}>
          {/* Navbar */}
          <nav style={{
            borderBottom: "1px solid #B1B6C6", paddingBottom: '2px', position: 'relative', padding: "15px", color: "#fff", textAlign: "center", height: "70px", display: "flex", alignItems: "center", background: "linear-gradient(to right, #fc3e04 , #fdd722)",
            justifyContent: "space-between", marginLeft: sidebarOpen ? "270px" : "0", transition: "margin-left 0.3s ease",
          }}>
            <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", }}>
              <img src="/bar.png" className="w-6" alt="Menu Toggle" onClick={() => setSidebarOpen((prev) => !prev)} // Toggle sidebar
                style={{ cursor: "pointer", width: 'fit-content' }} />
              <button style={{ backgroundColor: '#2e2684', color: "white", borderRadius: '4px' }}><b>{activeItem}</b></button>
            </div>
            <div className="relative" style={{ display: "flex", gap: "15px", alignItems: 'center' }}>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <span id="google_translate_element"></span>
              </div>
              <div>
                <img src="/User.png" style={{ width: '3rem' }} />
              </div>
              {/* <div style={{ color: 'black', fontSize: '25px' }}>
                <h6><b>Apex</b></h6>
              </div> */}

              {/* <div style={{ position: 'relative' }}>
                <img src="/Arrow.png" alt="More Options" className="cursor-pointer" onClick={toggleLogoutButton} style={{ cursor: 'pointer', width: '1.7rem' }} />
                {showLogout && (<Link href="/CitizenLogin">
                  <button className="logbutton" style={{
                    border: "1px solid #D1D5DB", color: "#374151", borderRadius: "0.375rem", padding: "0.5rem 0.75rem",
                    outline: "none", cursor: "pointer", position: "absolute", top: '127%', left: '-44px', marginTop: '5px',
                  }} onClick={() => localStorage.removeItem('Citizen')}>
                    Logout
                  </button>
                </Link>
                )}
              </div> */}


              <Link href="/CitizenLogin">
                <button className="logbutton" style={{
                  border: "1px solid #D1D5DB", color: "#374151", borderRadius: "0.375rem", padding: "0.3rem 0.75rem",
                  outline: "none", cursor: "pointer", marginTop: '5px',
                }} onClick={() => localStorage.removeItem('Citizen')}>
                  Logout
                </button>
              </Link>
            </div>
          </nav>

          {/* Content */}
          <div style={{ marginLeft: sidebarOpen ? "270px" : "0", transition: "margin-left 0.3s ease", backgroundColor: '#f4f8ff', height: '39rem' }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;