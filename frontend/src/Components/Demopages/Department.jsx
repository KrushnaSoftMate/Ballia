const Department=()=>{
    return (
    <>
    
    <section style={{padding: "20px 0",backgroundColor: "#f8f9fa"}}id="department">
        <div style={{maxWidth: "100%",margin: "0 auto",backgroundColor: "#fdf4e7",height: "auto",padding: "20px"}}>
          <h2 style={{fontSize: "24px",fontWeight: "bold",marginBottom: "20px",textAlign: "center"}}>
            नगर पालिका परिषद् बलिया <strong>ऑनलाइन सेवाएं</strong>
          </h2>
          <div >
            <ul style={{listStyle: "none",padding: "10px",display: "flex",flexWrap: "wrap",gap: "15px",justifyContent: "space-evenly"}}>
              <li style={{backgroundColor: "white",height: "12rem",padding: "30px",width: "12rem",borderRadius: "20px",
                boxShadow: "1px 1px 1px rgba(1,1,1,1)",paddingLeft: "24px",paddingTop: "25px",flex: "1 1 calc(33.33% - 30px)",maxWidth: "16rem"}}>
                <div><img src="/Icons & Images/सम्पत्ति-कर.png"alt=""style={{marginBottom: "10px",maxWidth: "70px"}}/>
                </div>
                <div
                style={{
                  display: "flex",
                  gap: "3rem",
                  paddingTop: "15px",
                }}
              >
                <strong>सम्पत्ति <br /> कर</strong>
                <a
                  href="/CitizenLogin"
                  style={{
                    display: "block",
                    marginTop: "10px",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/Icons & Images/Blue-Arrow.png"
                    alt=""
                    style={{
                      maxWidth: "50px",
                    }}
                  />
                </a>
                </div>
              </li>
              <li
              style={{
                backgroundColor: "white",
                height: "12rem",
                padding: "15px",
                borderRadius: "20px",
                boxShadow: "1px 1px 1px rgba(1,1,1,1)",
                paddingLeft: "24px",
                paddingTop: "25px",
                flex: "1 1 calc(33.33% - 30px)",
                maxWidth: "16rem",
              }}
            >
              <div>
                <img
                  src="/Icons & Images/जन्म-एवं-मृत्यु-पंजीकरण.png"
                  alt=""
                  style={{
                    marginBottom: "10px",
                    maxWidth: "70px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "2rem",
                  paddingTop: "15px",
                }}
              >
                <strong>
                  जन्म एवं मृत्यु <br /> पंजीकरण
                </strong>
                <a
                  href="/CitizenLogin"
                  style={{
                    display: "block",
                    marginTop: "10px",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="Icons & Images/Brown-Arrow.png"
                    alt=""
                    style={{
                      maxWidth: "50px",
                    }}
                  />
                </a>
              </div>
            </li>
            <li
              style={{
                backgroundColor: "white",
                height: "12rem",
                padding: "15px",
                borderRadius: "20px",
                boxShadow: "1px 1px 1px rgba(1,1,1,1)",
                paddingLeft: "24px",
                paddingTop: "25px",
                flex: "1 1 calc(33.33% - 30px)",
                maxWidth: "16rem",
              }}
            >
              <div>
                <img
                  src="/Icons & Images/लाइसेन्स.png"
                  alt=""
                  style={{
                    marginBottom: "10px",
                    maxWidth: "70px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "4rem",
                  alignItems: "baseline",
                  paddingTop: "15px",
                }}
              >
                <strong>लाइसेन्स</strong>
                <a
                  href="/CitizenLogin"
                  style={{
                    display: "block",
                    marginTop: "10px",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/Icons & Images/Yellow-Arrow.png"
                    alt=""
                    style={{
                      maxWidth: "50px",
                    }}
                  />
                </a>
                </div>
                </li>

             {/* <li
              style={{
                backgroundColor: "white",
                height: "12rem",
                padding: "15px",
                borderRadius: "20px",
                boxShadow: "1px 1px 1px rgba(1,1,1,1)",
                paddingLeft: "24px",
                paddingTop: "25px",
                flex: "1 1 calc(33.33% - 30px)",
                maxWidth: "16rem",
              }}
            >
              <div>
                <img
                  src="/Icons & Images/विज्ञापन-कर.png"
                  alt=""
                  style={{
                    marginBottom: "10px",
                    maxWidth: "70px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "4rem",
                  paddingTop: "15px",
                }}
              >
                <strong>विज्ञापन कर
                </strong>
                <a
                  href="#"
                  style={{
                    display: "block",
                    marginTop: "10px",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/Icons & Images/Green-Arrow.png"
                    alt=""
                    style={{
                      maxWidth: "50px",
                    }}
                  />
                </a>
              </div>
            </li>
            <li
              style={{
                backgroundColor: "white",
                height: "12rem",
                width: "12rem",
                padding: "15px",
                borderRadius: "20px",
                boxShadow: "1px 1px 1px rgba(1,1,1,1)",
                paddingLeft: "24px",
                paddingTop: "25px",
                flex: "1 1 calc(33.33% - 30px)",
                maxWidth: "16rem",
              }}
            >
              <div>
                <img
                  src="/Icons & Images/म्युटेशन.png"
                  alt=""
                  style={{
                    marginBottom: "10px",
                    maxWidth: "70px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "4rem",
                  alignItems: "baseline",
                  paddingTop: "15px",
                }}
              >
                <strong>म्युटेशन</strong>
                <a
                  href="javascript:void(0);"
                  style={{
                    display: "block",
                    marginTop: "10px",
                  }}
                >
                  <img
                    src="/Icons & Images/Orange-Arrow.png"
                    alt=""
                    style={{
                      maxWidth: "50px",
                    }}
                  />
                </a>
              </div>
            </li> */}
            </ul>
          </div>
        </div>
      </section>
    </>)
}
export default Department;