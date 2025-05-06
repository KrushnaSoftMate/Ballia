"use client"
import { Agent } from '../AdminContext/AgentManagement';
import "./navbar.css";
import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";

if (typeof window !== "undefined") {
  window.googleTranslateElementInit = function () {
    new window.google.translate.TranslateElement(
      { pageLanguage: 'en' },
      'google_translate_element'
    );
  }
}
const layout = ({ children }) => {

  const statecalls = useContext(Agent);
  const { GetMenus } = statecalls
  const [panel, setpanel] = useState("showpanel");
  const [renderdata, SetRenderdata] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let token = window.localStorage.getItem('AgentToken')
      if (token != undefined) {
        getmenu();
      } else {
        alert('please login')
        window.location.href = '/AgentLogin'
      }
    }
  }, []);
  const getmenu = async () => {
    const data = await GetMenus();
    SetRenderdata(data);
  };

  const sidepanel = () => {
    if (panel === "showpanel") {
      setpanel("panel");
    } else {
      setpanel("showpanel");
    }
  };

  const showoptions = (e) => {
    let k = document.getElementById(e.currentTarget.value);
    if (k == null) { return }
    if (k.style.display == 'none') {
      k.style.display = 'block'
    }
    else {
      k.style.display = 'none'
    }
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        {/* This is sidePanel */}
        <div
          className={panel}
          style={{
            boxShadow: "2px",
            animation: "fadeIn 1s ease-in-out",
          }}
        >
          <div
            className="card"
            style={{
              width: "16rem",
              height: "120vh",
              display: "flex",
              justifyContent: "center",
              background: 'white',
              border: "none",
              boxShadow: '2px 0px 11px 1px'
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "1rem",
              }}
            >
              <img
                src="/UP-Logo.jpg"
                alt="..."
                style={{ width: "6rem", height: "6rem", alignSelf: "center" }}
              />
            </div>
            <ul className="list-group list-group-flush" style={{ border: "none" }}>
              {
                loading ? (
                  <p>Loading...</p>
                ) : (
                  Array.isArray(renderdata) ?
                    renderdata.map((e) => {
                      if (!e.Summenuid) {
                        return (
                          <li className="hovereffect" key={e.Menu_ID} value={e.Menu_ID} onClick={(e) => showoptions(e)}>
                            <Link href={e.Link} className="list-group-item  listchange" style={{ backgroundColor: "transparent", border: "none", color: 'black', fontWeight: '500' }}>
                              <i className={e.icons + " mx-2"} aria-hidden="true"></i>
                              <span>
                                {e.Menu_Name}
                              </span>
                              <ul id={e.Menu_ID} style={{ display: 'none' }}>
                                {renderdata.map((x) => {
                                  if (e.Menu_ID === x.Summenuid) {

                                    return (
                                      <>
                                        <Link href={x.Link} style={{ textDecoration: 'none', fontSize: '12px', color: "black" }}><li className="hovereffect" style={{ paddingLeft: "15px" }}>{x.Menu_Name}</li></Link>
                                      </>)
                                  }
                                })}
                              </ul>
                            </Link>
                          </li>
                        );
                      }

                    }) : <a style={{ color: 'white' }}>Kindly Refresh</a>
                )
              }
              <Link href='/AgentLogin'>
                <button
                  className="mx-4 my-5 btn1 hovereffect"
                  style={{ border: "1px solid #f1772e", padding: '10px 70px' }}
                  onClick={() => localStorage.clear()}
                >
                  <span style={{ fontSize: "15px", color: '#f1772e' }}>
                    Logout
                    <img
                      style={{ position: 'absolute', margin: '4px', width: "20px" }}
                      src="/Logout.png"
                    />
                  </span>
                </button>
              </Link>
            </ul>


            <div className="card-body">

            </div>
          </div>
        </div>
        {/* this is navebar */}

        <div style={{ width: "100vw" }}>
          <nav
            className="navbar navbar-static-top"
            id="imgcss"
            style={{
              background: "#f1772e",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <a
              onClick={sidepanel}
              href="#"
              className="sidebar-toggle"
              data-toggle="push-menu"
              role="button"
              style={{
                color: "white",
                textDecoration: "none",
                marginLeft: "1rem",
              }}
            >
              <i className="fa-solid fa-sliders"></i>
              <span style={{ padding: "5px", marginLeft: "5px", border: "1px", border: "none", borderRadius: "8px" }}>Navbar</span>
            </a>
            <span id='google_translate_element'></span>
          </nav>
          {children}
        </div>
      </div>
    </>
  );
};

export default layout;
