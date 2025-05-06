"use client";

import Link from "next/link";

const page = () => {
    return (
        <>
       <Link href="/Citizen/TradeLicenseManagement">
      <button className="btn btn-primary">Back</button>
    </Link>
        <div
            style={{ width: "90%", maxWidth: "600px", margin: "0 auto", position: "relative", boxShadow: "1px 1px 1px 1px", borderRadius: "20px", marginTop: '10px',backgroundColor:'white' }}>
            {/* Header Section */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #999999", padding: "20px", flexWrap: "wrap" }}>
                <h2
                    style={{fontWeight: "500",fontSize: "18px",lineHeight: "22px",marginBottom: "10px",flex: "1 0 auto"}}>
                    Required Documents - Trade License
                </h2>
                <a
                    href="/Citizen/TradeLicenseManagement"
                    style={{ textAlign: "right", flex: "0 0 auto" }}
                >
                    <i
                        className="fa-regular fa-circle-xmark"
                        style={{ fontSize: "30px", color: "black" }}
                    ></i>
                </a>
            </div>

            {/* Document Sections */}
            <div
                style={{display: "flex",paddingTop: "20px",height: "auto",padding:'10px'}}>
                {Array(1)
                    .fill()
                    .map((_, index) => (
                        <div key={index} style={{ width: "100%" }}>
                            <div>
                                <h4
                                    style={{
                                        fontWeight: "600",
                                        fontSize: "18px",
                                        lineHeight: "22px",
                                        textAlign: "center",
                                    }}
                                >
                                    Owner Proof
                                </h4>
                            </div>
                            <div
                                style={{
                                    border: "1px solid #F26F00",
                                    backgroundColor: "#FFF5EC",
                                    borderRadius: "15px",
                                    padding: "20px",
                                    marginTop: "10px",
                                    backgroundColor:'white'
                                }}
                            >
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr",
                                        gap: "10px",
                                    }}
                                >
                                    {["1. Owner ID Card", "2. Ownership Documents", "3. Owner Photo", "4. Old License"].map(
                                        (text, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    fontWeight: "500",
                                                    fontSize: "16px",
                                                    lineHeight: "20px",
                                                    color: "#000000",
                                                }}
                                            >
                                                {text}
                                            </div>
                                        )
                                    )}
                                </div>
                                <p
                                    style={{
                                        fontWeight: "400",
                                        fontSize: "13px",
                                        lineHeight: "18px",
                                        color: "#000000",
                                        marginTop: "10px",
                                    }}
                                >
                                    * These are mandatory documents required to apply for a Trade License.
                                </p>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Footer Section with Buttons */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                    padding: "20px 0",
                    flexWrap: "wrap",
                }}
            >
                <a href="/Citizen/TradeLicenseManagement">
                    <button
                        style={{
                            width: "100px",
                            height: "40px",
                            textAlign: "center",
                            borderRadius: "20px",
                            border: "1px solid #B1B6C6",
                            color: "black",
                            fontWeight: "600",
                            fontSize: "16px",
                            lineHeight: "20px",
                        }}
                    >
                        Cancel
                    </button>
                </a>
                <a href="/Citizen/TradeLicenseManagement/License">
                    <button
                        style={{
                            width: "100px",
                            height: "40px",
                            textAlign: "center",
                            borderRadius: "20px",
                            backgroundColor: "#F26F00",
                            color: "#FFFFFF",
                            fontWeight: "600",
                            fontSize: "16px",
                            lineHeight: "20px",
                        }}
                    >
                        Apply
                    </button>
                </a>
            </div>
        </div>
        </>
    );
};

export default page;
