"use client";
 
import Link from "next/link";
 
export default function PropertyTaxPage() {
    return (
        <>
       
        <div
            style={{
                width: "100%",
                padding: "1rem 20px",
                paddingLeft: "4rem",
            }}
        >
            <div>
                <h2
                    style={{
                        fontWeight: "bold",
                        fontSize: "2rem",
                        lineHeight: "2.5rem",
                        color: "#000000",
                    }}
                >
                    Citizen Complaints
                </h2>
            </div>
 
            {/* Responsive Cards Section */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    paddingTop: "20px",
                }}
            >
                {/* Card 1 */}
                <div
                    style={{
                        backgroundColor: "white",
                        width: "15rem",
                        padding: "1rem",
                        borderRadius: "20px",
                        flex: "1 1 calc(100% - 40px)", // Adjusts width responsively
                        maxWidth: "300px", // Limits card width on larger screens
                    }}
                >
                    <Link
                        href="/Citizen/CitizenComplaints/ComplainApplication"
                        className="text-decoration-none"
                    >
                        <div style={{ display: "grid", padding: "10px" }}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src="/Birth-Certificate.png"
                                    alt="My Applications"
                                    style={{ width: "4rem" }}
                                />
                                {/* <p style={{ color: "#cd9518", fontSize: "1.5rem" }}>(0)</p> */}
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <p
                                    style={{
                                        color: "black",
                                        fontSize: "1rem",
                                        marginTop: "1rem",
                                    }}
                                >
                                    <b>Citizen Complaints</b>
                                </p>
                                <img
                                    src="/Next-Arrow1.png"
                                    alt="Next Arrow"
                                    style={{ width: "3rem", height: "3rem" }}
                                />
                            </div>
                        </div>
                    </Link>
                </div>
 
                {/* Card 2 */}
                <div
                    style={{
                        backgroundColor: "white",
                        width: "15rem",
                        padding: "1rem",
                        borderRadius: "20px",
                        flex: "1 1 calc(100% - 40px)", // Adjusts width responsively
                        maxWidth: "300px", // Limits card width on larger screens
                    }}
                >
                    <Link
                        href="/Citizen/CitizenComplaints/ViewComplaints"
                        className="text-decoration-none"
                    >
                        <div style={{ display: "grid", padding: "10px" }}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src="/My-Application.png"
                                    alt="Pay Property Tax"
                                    style={{ width: "4rem" }}
                                />
                                <p
                                    style={{
                                        color: "#e40713",
                                        fontSize: "1.5rem",
                                    }}
                                >
                                    <b>(0)</b>
                                </p>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <p
                                    style={{
                                        color: "black",
                                        fontSize: "1rem",
                                        marginTop: "1rem",
                                    }}
                                >
                                    <b>
                                       My <br/>Applications
                                    </b>
                                </p>
                                <img
                                    src="/Next-Arrow1.png"
                                    alt="Next Arrow"
                                    style={{ width: "3rem", height: "3rem" }}
                                />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
 
            {/* Accordion */}
            <div className="accordion mt-4" id="accordionFlushExample">
                <div
                    className="accordion-item"
                    style={{
                        backgroundColor: "#fce6e7",
                        boxShadow: "0 3px 3px 4px rgba(0, 0, 0, 0.1)",
                        borderRadius: "20px",
                        width: '100%',  // Adjust to 100% for smaller screens
                    }}
                >
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne"
                            aria-expanded="false"
                            aria-controls="flush-collapseOne"
                            style={{
                                backgroundColor: "#fce6e7",
                                borderRadius: "20px",
                            }}
                        >
                            <b>How it Works?</b>
                        </button>
                    </h2>
                    <div
                        id="flush-collapseOne"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample"
                    >
                        <div className="accordion-body">
                        To submit a complaint, Fill in the necessary basic information, such as your name and contact details, and provide a detailed description of your complaint. Once all the information is completed, submit the form. Your complaint will then be marked as pending, indicating that it has been received. An administrator will review your complaint, assess the situation, and may reach out to you for additional information or to provide an immediate solution. The administrator will then work towards resolving your complaint and inform you of the outcome. This process ensures that your concerns are addressed promptly and effectively.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}