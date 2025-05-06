import Link from 'next/link'
import React from 'react'


const page = () => {
    <script>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"></link>

    </script>
    return (
        <div style={{ padding: "20px" }}>
            <div style={{ border: "2px solid black", padding: "10px", display: "grid" }}>
                <div style={{ border: "1px solid grey", padding: "0 30px", }}>
                    <h2 style={{ textAlign: "center" }}><b>Bill of Supply For: NOV-2023</b></h2>
                </div>
                <div style={{ border: "1px solid grey", marginTop: "5px", padding: "0 30px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <img src="https://play-lh.googleusercontent.com/6fnsDGZgpecLuPzosfO91UxbN_XDfm1hLD2JdRmwgnMtT30YolzlR7yBnhbZmWuHzJE" style={{ height: '60px' }}></img>
                        <div>
                            <h2 style={{ textAlign: "center" }}><b>Property Tax Department</b></h2>
                        </div>
                        <div>
                            <img src="WRD_Images/emblem2.png" />
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", marginTop: "10px" }}>
                        <div>
                            <h4>GSTIN NO. : 27AAECM2933K1ZB<br />
                                BILL NO. (GGN): 000002227571842</h4>
                        </div>
                        <div style={{ display: "flex", alignItems: "flex-end", flexWrap: "wrap" }}>
                            <h4>HSN code 271600000</h4>
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", border: "1px solid", flexWrap: "wrap", marginTop: "5px", padding: "0 30px" }}>
                    <div>
                        <h4><b>Customer Number:</b></h4>
                        <h4><b>Bill Number:</b></h4>
                        <h4><b>Name of Customer:</b></h4>
                        <h4><b>Customer Type:</b></h4>
                        <h4><b>Mobile Number:</b></h4>
                    </div>
                    <div style={{ marginLeft: "50px" }}>
                        <h4>NI12011083671</h4>
                        <h4>XXXXXXXXXXXX</h4>
                        <h4>K Power and Paper Mill, Borgaon</h4>
                        <h4>Industrial</h4>
                        <h4>XXXXXXXXXX</h4>
                    </div>
                </div>
                <div style={{ display: "flex", border: "1px solid", flexWrap: "wrap", marginTop: "5px", padding: "0 30px" }}>
                    <div>
                        <h4><b>Reciept Number:</b></h4>
                        <h4><b>Bill Paid Date:</b></h4>
                    </div>
                    <div style={{ marginLeft: "70px" }}>
                        <h4>51252</h4>
                        <h4>12-Dec-23</h4>
                    </div>
                </div>

                <div style={{ marginTop: "5px", display: 'flex', justifyContent: "space-around" }}>
                    <div className="col-6" style={{ border: "1px solid grey" }}>
                        <h4 style={{ textAlign: "center" }}><b>Paid</b></h4>
                    </div>
                    <div className="col-6" style={{ border: "1px solid grey" }}>
                        <h4 style={{ textAlign: "center" }}><b>Pending</b></h4>
                    </div>
                </div>
                <div style={{ marginTop: "5px", display: 'flex', justifyContent: "space-around" }}>
                    <div className="col-6" style={{ display: "grid", flexWrap: "wrap", border: "1px solid grey", padding: "0 30px" }}>
                        <div style={{ display: "flex" }}>
                            <h4 style={{ marginTop: "10px" }}><b>Water Charges: </b></h4>
                            <h4 style={{ marginTop: "10px", marginLeft: "70px" }}>24,26,320 Rs.</h4>
                        </div>
                        <div style={{ display: "flex" }}>
                            <h4 style={{ marginTop: "10px" }}><b>Local Fund Charges: </b></h4>
                            <h4 style={{ marginTop: "10px", marginLeft: "30px" }}>4,26,320 Rs.</h4>
                        </div>
                    </div>
                    <div className="col-6" style={{ display: "grid", flexWrap: "wrap", border: "1px solid grey", padding: "0 30px" }}>
                        <div style={{ display: "flex" }}>
                            <h4 style={{ marginTop: "10px" }}><b>Water Charges: </b></h4>
                            <h4 style={{ marginTop: "10px", marginLeft: "70px" }}>24,26,320 Rs.</h4>
                        </div>
                        <div style={{ display: "flex" }}>
                            <h4 style={{ marginTop: "10px" }}><b>Local Fund Charges: </b></h4>
                            <h4 style={{ marginTop: "10px", marginLeft: "30px" }}>4,26,320 Rs.</h4>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: "5px", display: 'flex', justifyContent: "space-around" }}>
                    <div className="col-6" style={{ display: "flex", flexWrap: "wrap", border: "1px solid grey", padding: "0 30px" }}>
                        <div style={{ display: "flex" }}>
                            <h4 style={{ marginTop: "10px" }}><b>Total Amount Paid: </b></h4>
                            <h4 style={{ marginTop: "10px", marginLeft: "30px" }}>24,26,320 Rs.</h4>
                        </div>
                    </div>
                    <div className="col-6" style={{ display: "flex", flexWrap: "wrap", border: "1px solid grey", padding: "0 30px" }}>
                        <div style={{ display: "flex" }}>
                            <h4 style={{ marginTop: "10px" }}><b>Total Amount Pending: </b></h4>
                            <h4 style={{ marginTop: "10px", marginLeft: "10px" }}>24,26,320 Rs.</h4>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
                    <button className="btn btn-default"
                        style={{ backgroundColor: "#f1772e", color: "white", width: "10rem", borderRadius: "10px", border: "none" }}>Print
                        Reciept</button>
                </div>
            </div>
        </div>


        // <div style={{ position: 'relavie', height: '85vh', width: '53vw', backgroundColor: "whitesmoke", border: '2px solid black', marginLeft: '100px' }}>

        //     <div style={{ position: 'absolute', height: '80vh', width: '50vw', margin: '15px', backgroundColor: "white", border: '2px solid black', }}>

        //         <div style={{ margin: '10px', width: '48vw', height: '10vh', border: '1px solid black' }}>
        //             <h5 style={{ textAlign: 'center' }}>Bill of Supply For: NOV-2023-Receipt</h5>
        //         </div>

        //         <div style={{ display: 'flex',justifyContent:'center', margin: '10px', width: '48vw', height: '20vh', border: '1px solid black' }}>
        //             <img src="https://play-lh.googleusercontent.com/6fnsDGZgpecLuPzosfO91UxbN_XDfm1hLD2JdRmwgnMtT30YolzlR7yBnhbZmWuHzJE" style={{ height: '60px' }}></img>
        //             <h5 style={{ textAlign: 'center' }}>Property Tax Department</h5>
        //         </div>

        //         <div style={{ margin: '10px', width: '48vw', height: '20vh', border: '1px solid black' }}>
        //             <h5>Customer Number:</h5>
        //             <h5>Bill Number:</h5>
        //             <h5>Customer Name</h5>
        //             <h5>Customer Type:</h5>
        //         </div>

        //         <div style={{ margin: '10px', width: '48vw', height: '10vh', border: '1px solid black' }}>
        //             <h5>Receipt Number:</h5>
        //             <h5>Bill Paid Date:</h5>
        //         </div>

        //     </div>

        // </div>
    )
}

export default page