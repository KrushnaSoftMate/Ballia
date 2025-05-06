"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Admin } from "@/app/AdminContext/AdminManageMent";
import Link from "next/link";
import "./loading.css";


const page = () => {
    const { GetDocumentForm, BulkBillGeneration, BulkBillDownload, CheckGenerationProcess } = useContext(Admin);
    const [Locality, SetLocality] = useState([]);
    const [form, SetForm] = useState({});
    const [loading, setLoading] = useState(false);
    const [foldername, setfoldername] = useState([]);

    useEffect(() => {
        Getlocality()
    }, []);


    async function Getlocality() {
        let Locality = await GetDocumentForm();
        let data = await CheckGenerationProcess();
        console.log("Locality", Locality);
        console.log("data", data);
        SetLocality(Locality?.locality)
        setfoldername(data);

        if(data.length > 0){
            setLoading(true);
        }
        else{
            setLoading(false);
        }
    }

    function handleChange(e) {
        SetForm({ ...form, [e.target.id]: e.target.value });
    }

    async function Submit(e) {
        e.preventDefault();
        try {
            console.log("Data to Submit :: ", form);
            setLoading(true);
            let result = await BulkBillGeneration(form);
            console.log(" Result i geyt  :: ", result);
            if (result.success == true) {
                alert('Created Succesfully');
                setLoading(false);
            } else {
                alert("Error while Creating Bulk Bill !!!");
                setLoading(false);
            }
        }
        catch (err) {
            console.log("error ", err);
        }
    };

    return (
        <>




            <div style={{ backgroundColor: '#f2f4f7', height: '100vh', padding: '10px' }}>
                <div>
                    <div>
                        <h5><b>Create Bulk Bill</b></h5>
                    </div>
                    <form onSubmit={Submit} style={{ textAlign: 'center' }}>
                        <select id='locality'
                            style={{ margin: "10px", padding: '2px', width: "40%" }}
                            required onChange={(e) => { SetForm({ ...form, [e.currentTarget.id]: e.target.value }) }}>
                            <option selected disabled>Select Locality</option>
                            {Locality && Locality.map((e) => (
                                <option value={e.uniqueness}>{e.uniqueness}</option>
                            ))}
                        </select>
                        <table
                            border="1"
                            cellpadding="0"
                            cellspacing="0"
                            style={{
                                borderCollapse: "collapse",
                                lineHeight: "20px",
                                width: "80%",
                                margin: "auto"
                            }}
                        >
                            <tbody  >
                                <tr>
                                    <td
                                        // colSpan="7"
                                        align="center"
                                        style={{ color: "black", paddingTop: "4px" }}
                                    >
                                        <img
                                            src="/BALLIA-Logo512.png"
                                            width="80"
                                            height="70"
                                            align="left"
                                        />
                                        <strong>
                                            <span style={{ fontSize: "large", color: "Red" }}>
                                                BALLIA MUNICIPAL CORPORATION                                            </span>
                                            <br />
                                            PROPERTY TAX BILL {Date().split(" ")[3]}
                                            <br />
                                            (propertytax.Ballia.org)
                                        </strong>
                                    </td>
                                </tr>
                                <tr style={{ backgroundColor: "red" }}>
                                    <td
                                        colSpan="7"
                                        align="center"
                                        style={{
                                            background:
                                                "linear-gradient(to bottom, #7abcff 0%,#60abf8 44%,#4096ee 100%)",
                                            color: "White",
                                        }}
                                        className="p1 ft1"
                                    >
                                        <strong>PROPERTY DETAILS</strong>
                                    </td>
                                </tr>
                                <tr>


                                    <td className="style2">
                                        <strong>From Date</strong>
                                    </td>
                                    <td className="style2">
                                        <span id="lbl_financialyear">
                                            <input
                                                type="date"
                                                id="FromDate"
                                                onChange={handleChange}
                                                className="form-control"
                                                required
                                            ></input>
                                        </span>
                                    </td>
                                    <td className="style2">
                                        <strong>To Date</strong>
                                    </td>
                                    <td className="style2">
                                        <span id="lbl_financialyear">
                                            <input
                                                type="date"
                                                id="ToDate"
                                                onChange={handleChange}
                                                className="form-control"
                                                required
                                            ></input>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table
                            id="tbl_bill"
                            border="1"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            className="p2 ft3"
                            style={{
                                borderCollapse: "collapse", lineHeight: "20px", width: "80%",
                                margin: "auto"
                            }}
                        >
                            <tbody >
                                <tr>
                                    <td
                                        colSpan="5"
                                        align="center"
                                        style={{
                                            background:
                                                "linear-gradient(to bottom, #7abcff 0%,#60abf8 44%,#4096ee 100%)",
                                            color: "white",
                                        }}
                                        className="p2 ft1"
                                    >
                                        <strong>PROPERTY TAX BILL</strong>
                                    </td>
                                </tr>
                                <tr align="center">
                                    <td style={{ width: "30%" }} colSpan="1">
                                        <b>Tax Head</b>
                                    </td>
                                    <td style={{ width: "23%" }} colSpan="1">
                                        <b>Total</b>
                                    </td>
                                </tr>

                                <tr>
                                    <td style={{ width: "25%", textAlign: 'center' }}>
                                        <strong>

                                            <span style={{ fontSize: "large", color: "Black" }}>
                                                Total
                                            </span>
                                        </strong>
                                    </td>
                                    <td style={{ width: "25%" }} align="center">
                                        <span id="lbl_genTax2">
                                            <input
                                                type="number"
                                                // placeholder={Total?.Total ? Total?.Total : Total}
                                                style={{ textAlign: "center", margin: "4px" }}
                                                onChange={handleChange}
                                                disabled
                                            ></input>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <table
                            border="1"
                            cellpadding="0"
                            cellspacing="0"
                            style={{
                                borderCollapse: "collapse",
                                lineHeight: "20px",
                                width: "80%",
                                margin: "auto"
                            }}
                        >
                            <tbody>
                                <tr>
                                    <td
                                        colSpan="7"
                                        align="center"
                                        style={{ color: "black", padding: "6px" }}
                                        className="p1 ft1"
                                    >
                                        <img
                                            src="images2/billlogo.png"
                                            width="80"
                                            height="70"
                                            align="left"
                                            hidden
                                        />
                                        <strong>
                                            <span
                                                className="btn btn-primary"
                                            // onClick={() => CalculateTotal()}
                                            >
                                                CalculateTotal
                                            </span>
                                            <span style={{ fontSize: "large", color: "Black", marginLeft: '4px ' }}>
                                                Total :-
                                            </span>
                                            {/* Amount Need To be Paid : {Total?.Total ? Total?.Total : Total} */}
                                        </strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button
                            type="submit"
                            className="btn btn-danger m-2 col-3"
                        >
                            Generate Bill
                        </button>
                    </form>
                </div>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>FromDate</th>
                            <th>ToDate</th>
                            <th>locality</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            foldername && foldername.map((e) => {
                                return (
                                    <tr>
                                        <td>{e.id}</td>
                                        <td>{e.FromDate}</td>
                                        <td>{e.ToDate}</td>
                                        <td>{e.locality}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            {
                loading === true &&
                <div className="col-12 LoadingDiv py-2">
                    <div className="LoadingContainer">
                        <div class="spinner-border text-dark" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            }





        </>
    )
}

export default page
