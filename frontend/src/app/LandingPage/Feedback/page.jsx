'use client'
import React, { useState } from "react";
import MainNav from '@/Components/Demopages/MainNav';
import Footer from '@/Components/Demopages/Footer';
const Feedback = () => {
  const containerStyle = {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#333",
  };

  const labelStyle = {
    fontWeight: "bold",
    display: "block",
    marginBottom: "5px",
    color: "#555",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  };

  const messageStyle = {
    marginTop: "15px",
    color: "green",
    textAlign: "center",
    fontWeight: "bold",
  };

  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Feedback submitted successfully!");
    
    setFeedback({ name: "", email: "", message: "" }); // Clear form after submission
  };

  return (
    <>
    <MainNav></MainNav>
    <div style={containerStyle}>
      <h2 style={headingStyle}>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Name:</label>
        <input
          type="text"
          name="name"
          value={feedback.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>Email:</label>
        <input
          type="email"
          name="email"
          value={feedback.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>Message:</label>
        <textarea
          name="message"
          value={feedback.message}
          onChange={handleChange}
          style={{ ...inputStyle, height: "100px" }}
          required
        ></textarea>

        <button type="submit" style={buttonStyle}>
          Submit Feedback
        </button>
      </form>

      {submitted && <p style={messageStyle}>Thank you for your feedback!</p>}
    </div>
    <Footer></Footer>
    </>
  );
};

export default Feedback;
