 {/* <div style={{ width: "270px", height: "100vh", borderRight: "2px solid #DFEAF0", position: "fixed", backgroundColor: "white", transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.3s ease", zIndex: 1000, overflow: 'auto' }}>
          <div
            className="flex justify-end xl:hidden lg:flex md:flex"
            onClick={() => setSidebarOpen(false)} style={{ cursor: 'pointer' }}
          >
            <i className="fa-solid fa-xmark "></i>
          </div>
          

          <div className="d-flex justify-content-center" style={{ textAlign: "center", paddingTop: "10px" }}>
            <img src="/Nagar-Palika-Parishad-Logo.png" style={{ width: "5rem" }} alt="Nagar Palika Parishad Logo" />
          </div>

          <div className="d-flex flex-column border-bottom overflow-hidden" style={{ display: "grid", paddingTop: "15px", gap: "20px", borderBottom: "1px solid #B1B6C6", paddingBottom: "20px", paddingLeft: '10px' }}>
            {menuItems.map((item) => (
              <Link key={item.name} href={item.href} style={{ textDecoration: 'none' }}>
                <div
                  className="bg-image hover-overlay hover-zoom hover-shadow ripple"
                  style={styles.menuItem(hoveredItem === item.name)}
                  onMouseEnter={() => handleHover(item.name)}
                  onMouseLeave={() => handleHover(null)}
                >
                  <img
                    src={item.img}
                    // style={{ width: "24px", height: "24px" }}
                    alt={item.name}
                    style={styles.icon(hoveredItem === item.name)}

                  />
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div> */}