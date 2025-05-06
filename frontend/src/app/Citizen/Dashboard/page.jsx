import Link from "next/link";
import React from "react";
import "./dashboard.css";

const Dashboard = () => {

  return (
    <div style={{ width: "100%", padding: "1rem 20px", paddingLeft: "4rem", backgroundColor: "eae9f2" }}>
      <div>
        <h2 style={{ fontWeight: "bold", fontSize: "32px", lineHeight: "40px", color: "#000000" }}>Dashboard</h2>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-item">
          <Link href="/Citizen/PropertyTaxAsset" className="text-decoration-none">
            <div className="card-container" style={{ display: 'flex', gap: '33px' }}>
              <div>
                <img src="/Property-Tax-Asset.png" alt="Property Tax Asset" style={{ width: '4rem' }} />
                <p style={{ color: 'black', fontSize: '18px', marginTop: '1rem' }}><b>Property Tax<br /> Asset</b></p>
              </div>
              <div style={{ marginTop: '2.5rem' }}>
                <img src="/Next-Arrow1.png" style={{ width: '3rem' }} />
              </div>
            </div>
          </Link>
        </div>

        <div className="dashboard-item">
          <Link href="/Citizen/BirthCertificateForm" className="text-decoration-none">
            <div className="card-container" style={{ display: 'flex', gap: '33px' }}>
              <div>
                <img src="/Birth-Certificate.png" alt="Birth Certificate" style={{ width: '4rem' }} />
                <p style={{ color: 'black', fontSize: '18px', marginTop: '1rem' }}><b>Birth<br />Certificate</b></p>
              </div>
              <div style={{ marginTop: '2.5rem' }}>
                <img src="/Next-Arrow1.png" style={{ width: '3rem' }} />
              </div>
            </div>
          </Link>
        </div>

        <div className="dashboard-item">
          <Link href="/Citizen/DeathCertificateForm" className="text-decoration-none">
            <div className="card-container" style={{ display: 'flex', gap: '33px' }}>
              <div>
                <img src="/Death-Certificate.png" alt="Death Certificate" style={{ width: '4rem' }} />
                <p style={{ color: 'black', fontSize: '18px', marginTop: '1rem' }}><b>Death<br />Certificate</b></p>
              </div>
              <div style={{ marginTop: '2.5rem' }}>
                <img src="/Next-Arrow1.png" style={{ width: '3rem' }} />
              </div>
            </div>
          </Link>
        </div>



        <div className="dashboard-item">
          <Link href="/Citizen/TradeLicenseManagement" className="text-decoration-none">
            <div className="card-container" style={{ display: 'flex', gap: '33px' }}>
              <div>
                <img src="/Trade-License-Management.png" alt="Trade License Management" style={{ width: '4rem' }} />
                <p style={{ color: 'black', fontSize: '18px', marginTop: '1rem' }}><b>Trade License<br />Management</b></p>
              </div>
              <div style={{ marginTop: '2.5rem' }}>
                <img src="/Next-Arrow1.png" style={{ width: '3rem' }} />
              </div>
            </div>
          </Link>
        </div>
        {/* <div className="dashboard-item">
          <Link href="/Citizen/CitizenComplaints" className="text-decoration-none">
            <div className="card-container" style={{ display: 'flex', gap: '33px' }}>
              <div>
                <img src="/Citizen-Complaints.png" alt="Citizen Complaints" style={{ width: '4rem' }} />
                <p style={{ color: 'black', fontSize: '18px', marginTop: '1rem' }}><b>Citizen<br />Complaints</b></p>
              </div>
              <div style={{ marginTop: '2.5rem' }}>
                <img src="/Next-Arrow1.png" style={{ width: '3rem' }} />
              </div>
            </div>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;