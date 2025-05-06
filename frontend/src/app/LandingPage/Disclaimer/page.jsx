import React from "react";
import MainNav from '@/Components/Demopages/MainNav';
import Footer from '@/Components/Demopages/Footer';
const Disclaimer = () => {
  const containerStyle = {
    maxWidth: "800px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    color: "#333",
    textAlign: "center",
  };

  const textStyle = {
    color: "#555",
    lineHeight: "1.6",
  };

  const highlightStyle = {
    color: "red",
    fontWeight: "bold",
  };

  return (
    <>
    <MainNav></MainNav>
    <div style={containerStyle}>
      <h2 style={headingStyle}>Disclaimer</h2>
      <p style={textStyle}>
        The information provided on this website is for general informational
        purposes only. While we strive to ensure the accuracy of property tax
        details, we make no guarantees about the completeness, reliability, or
        accuracy of the information.
      </p>
      <p style={textStyle}>
        <span style={highlightStyle}>Important:</span> Property tax rates,
        assessments, and regulations are subject to change by local
        authorities. Users are advised to verify the data with the relevant tax
        department before making any financial decisions.
      </p>
      <p style={textStyle}>
        By using this website, you agree that we are not liable for any losses
        or damages related to the use of this information.
      </p>
    </div>
    <Footer></Footer>
    </>
  );
};

export default Disclaimer;
