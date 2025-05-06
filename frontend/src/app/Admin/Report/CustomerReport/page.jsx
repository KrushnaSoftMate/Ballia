'use client'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { Admin } from "@/app/AdminContext/AdminManageMent"
import Pagination from "@/Components/pagination"
import { CSVLink } from 'react-csv'
import { usePDF } from 'react-to-pdf';
import { backend } from '../../../paths'
import * as XLSX from 'xlsx';

const GetReport = () => {

    const statecalls = useContext(Admin);
    const { CustomerReport, GetDocumentForm, GetAgent } = statecalls;
    const [renderdata, setRenderData] = useState([])
    const [formdata, setFormData] = useState({})
    const [Locality, SetLocality] = useState([])
    const [Meter, SetMeter] = useState([])
    const [TypeofProperty, SetTypeofProperty] = useState([])
    const [selectedZone, setSelectedZone] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [CSVDATA, SetCSVDATA] = useState([])
    const [agentdata, SetAgenetdata] = useState([])
    const { toPDF, targetRef } = usePDF({ filename: 'CustomerReport.pdf' });



    useEffect(() => {
        GetForm()
    }, [formdata.Zone, formdata.Ward])

    async function GetForm() {
        let data = await GetDocumentForm();
        const data1 = await GetAgent();
        console.log(data);
        SetLocality(data.locality)
        SetMeter(data.meter)
        SetTypeofProperty(data.toproperty)
        SetAgenetdata(data1)
    }
    const getcustomer = async (e) => {
        e.preventDefault();
        setRenderData(false)
        const data = await CustomerReport(formdata);
        // console.log("Fetched Data:", data);
        setRenderData(data);
    }

    // Function to group data by PropertyID and merge documents
    function groupByPropertyID(data) {
        // console.log(data);
        if (!Array.isArray(data)) {
            console.error("Data is not an array", data);
            return []; // Return an empty array as a fallback
        }
        const groupedData = {};

        data.forEach(item => {
            if (!groupedData[item.PropertyID]) {
                groupedData[item.PropertyID] = { ...item, documents: [...new Set(item.documents)] };
            } else {
                groupedData[item.PropertyID].documents = [...new Set([...groupedData[item.PropertyID].documents, ...item.documents])]
            }
        });

        return Object.values(groupedData);
    }

    // Use this grouped data in your table
    const groupedData = groupByPropertyID(renderdata);

    const maxDocuments = groupedData.reduce((max, customer) => {
        return Math.max(max, customer.documents.length);
    }, 0);

    function cards(e,index) {
        return (
            <tr>
                <td className='col-1'>{index+1}</td>
                <td>{e.Srno}</td>
                <td>{e.PropertyID}</td>
                <td>{e.FullName}</td>
                <td>{e.Plot_No}</td>
                <td>{e.TotalArea}</td>
                <td>{e.Ward}</td>
                {/* <td>{e.sqft}</td>
                <td>{e.Floor}</td>
                <td>{e.PropertyforUse}</td>
                <td>{e.ConstructionType}</td>
                <td>{e.Arv}</td>
                <td>{e.PropertyAge}</td>
                <td>{e.location}</td>
           
                <td>{e.Zone}</td>
                <td>{e.Meter}</td> */}
                {/* <td>
                    {e.documents.map((x, i) => (
                        <img
                            key={i}
                            style={{
                                borderRadius: '20px',
                                width: '80px',
                                marginBottom: '1rem',
                                display: 'block', // Ensure each image is on a new line
                            }}
                            src={backend + "/CustomerDocuments/" + x}
                        />
                    ))}
                </td> */}
                {/* <td>{e.createdBy}</td>
                <td>{e.TotalArv}</td>
                <td>{e.createdOn}</td> */}
            </tr>
        )
    }
    const uniqueZones = Array.from(new Set(Locality.map(e => e.Zone)));

    const filteredWards = Locality.filter(e => e.Zone === selectedZone);
    const uniqueWards = Array.from(new Set(filteredWards.map(e => e.Ward)));

    const filteredMohallas = Locality.filter(e => e.Ward === selectedWard);
    const uniquMohallas = Array.from(new Set(filteredMohallas.map(e => e.locality)));

    const handleChange = (e) => {
        setFormData({
            ...formdata,
            [e.target.id]: e.target.value,  // Use e.target.id to correctly identify the form field
        });
        if (e.target.id === 'Zone') {
            setSelectedZone(e.target.value);
        }
        if (e.target.id === 'Ward') {
            setSelectedWard(e.target.value);
        }
    };

    // function onSavefile() {
    //     if (renderdata.length > 0) {
    //         const headers = ["Srno", "PMC Number", "Consumer No", "Zone", "Ward", "Mohalla", "Customer Name", "Mobile Number", "Plot No", "Property Type", "Total Area", "Carpet Area", "Floor", "Construction Type", "ARV", "Road Width", "Property Age", "Location", "Created By"];
    //         const csvData = renderdata.map(item => [
    //             item.Srno,
    //             item.PMCNumber,
    //             item.PropertyID,
    //             item.Zone,
    //             item.Ward,
    //             item.Mohalla,
    //             item.FullName,
    //             item.ContactNumber,
    //             item.Plot_No,
    //             item.PropertyforUse,
    //             item.TotalArea,
    //             item.sqft,
    //             item.Floor,
    //             item.ConstructionType,
    //             item.TotalArv,
    //             item.Meter,
    //             item.PropertyAge,
    //             item.location,
    //             item.createdBy
    //         ]);
    //         const finalcsv = [headers, ...csvData];
    //         SetCSVDATA(finalcsv);
    //     }
    // }

    function onSavefile() {
        if (renderdata.length > 0) {
            // First Sheet Data
            const headers = ["Srno", "Consumer No", "Property Type", "PMC Number", "Plot No", "Total ARV", "AVR effective From", "Zone", "Ward", "Mohalla", "Customer Name", "Mobile Number", "Plot Area", "Road Width", "Property Tax", "Water Tax", "Property Age", "Electricity Connection", "Water Connection", "Sewer Connection", "Location"];
            const uniqueData = new Map();
            renderdata.forEach(item => {
                if (!uniqueData.has(item.PropertyID)) {
                    uniqueData.set(item.PropertyID, item);
                }
            });
            const csvData = Array.from(uniqueData.values()).map(item => [
                item.Srno,
                item.PropertyID,
                item.PropertyType,
                item.PMCNumber,
                item.Plot_No,
                item.TotalArv,
                item.createdOn,
                item.Zone,
                item.Ward,
                item.Mohalla,
                item.FullName,
                item.ContactNumber,
                item.TotalArea,
                item.Meter,
                item.PropertyTax,
                item.WaterTax,
                item.PropertyAge,
                item.ElectricityConnection,
                item.WaterConnection,
                item.SewerConnection,
                item.location,
            ]);
            const finalcsv = [headers, ...csvData];

            // Second Sheet Data (for example purposes)
            const secondSheetHeaders = ["Consumer Number", "Floor", "Floor Useas", "Construction type", "Carpet / builtup Area", "ARV"];
            const secondSheetData = renderdata.map(item => [
                item.CustomerID,
                item.Floor,
                item.PropertyforUse,
                item.ConstructionType,
                item.sqft,
                item.Arv,
            ]);

            // Create a new workbook
            const wb = XLSX.utils.book_new();

            // Convert the first sheet data to a worksheet
            const ws1 = XLSX.utils.aoa_to_sheet(finalcsv);
            XLSX.utils.book_append_sheet(wb, ws1, "Property Details");

            // Convert the second sheet data to a worksheet
            const ws2 = XLSX.utils.aoa_to_sheet([secondSheetHeaders, ...secondSheetData]);
            XLSX.utils.book_append_sheet(wb, ws2, "Floor Details");

            // Export the file
            XLSX.writeFile(wb, 'CustomerReports.xlsx');
        }
    }

    function handleDownloadPDF(refId) {
        const tableToPrint = document.getElementById(refId); // Get the table to print
        tableToPrint.removeAttribute('hidden');

        // Create a temporary clone of the table
        const printWindow = window.open('', '', 'height=500, width=800');
        printWindow.document.write('<html><head><title>Print Table</title>');

        // Add some style for proper table printing
        printWindow.document.write(`
            <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid black;
                    padding: 8px;
                    text-align: left;
                }
                img {
                    max-width: 100px; /* Adjust the size of the image */
                    max-height: 100px;
                }
            </style>
        `);

        printWindow.document.write('</head><body>');
        printWindow.document.write(tableToPrint.outerHTML); // Write the table to the new window
        printWindow.document.write('</body></html>');

        printWindow.document.close(); // Close the document to finish loading

        // Wait for images to load before triggering print
        printWindow.onload = function () {
            const images = printWindow.document.images;
            let loadedCount = 0;

            // If there are no images, print immediately
            if (images.length === 0) {
                printWindow.focus();
                printWindow.print();
                printWindow.close();
            }

            // Wait for all images to load
            for (let i = 0; i < images.length; i++) {
                images[i].onload = function () {
                    loadedCount++;
                    if (loadedCount === images.length) {
                        printWindow.focus();
                        printWindow.print(); // Trigger print
                        printWindow.close(); // Close the print window after printing
                    }
                };
                images[i].onerror = function () {
                    // Handle case where image fails to load
                    loadedCount++;
                    if (loadedCount === images.length) {
                        printWindow.focus();
                        printWindow.print(); // Trigger print even if some images fail to load
                        printWindow.close(); // Close the print window after printing
                    }
                };
            }
        };
        tableToPrint.setAttribute('hidden', 'hidden');
    }



    return (
        <>
            <div style={{ width: '80vw', margin: 'auto' }}>
                <div style={{ padding: '20px' }}>
                    <h4 style={{ textAlign: 'center' }}>Customer Reports</h4>
                    <form onSubmit={getcustomer} style={{ display: 'flex', justifyContent: 'center', width: '90%', flexWrap: "wrap", padding: '3%', borderRadius: '20px', backgroundColor: '#f2f4f7', marginTop: '10px' }}>
                        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                            <label style={{ fontWeight: 'bold' }}>From Date</label><br />
                            <input className='form-control mt-2' type='date' id='FromDate' onChange={handleChange} />
                        </div>

                        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                            <label style={{ fontWeight: 'bold' }}>To Date</label><br />
                            <input className='form-control mt-2' type='date' id='ToDate' onChange={handleChange} />
                        </div>
                        {/* <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                            <label style={{ fontWeight: 'bold' }}>Zone</label><br />
                            <select className="form-select mt-2" id="Zone" onChange={handleChange}>
                                <option disabled selected>Select Zone</option>
                                {uniqueZones && uniqueZones.map((e) => (
                                    <option className="form-control" key={e} value={e}>{e}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                            <label style={{ fontWeight: 'bold' }}>Ward</label><br />
                            <select className="form-select mt-2" id="Ward" onChange={handleChange}>
                                <option disabled selected>Select Ward</option>
                                {uniqueWards && uniqueWards.map((e) => (
                                    <option className="form-control" key={e} value={e}>{e}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                            <label style={{ fontWeight: 'bold' }}>Road Width</label><br />
                            <select className="form-select mt-2" id="Meter" onChange={handleChange} required>
                                <option disabled selected>Select Road Width</option>
                                {Meter && Meter.map((e) => (
                                    <option className="form-control mt-2" key={e.Meter} value={e.Meter}>{e.Meter}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                            <label style={{ fontWeight: 'bold' }}>Property Type</label><br />
                            <select className="form-select mt-2" id="PropertyType" onChange={handleChange} required>
                                <option disabled selected>Select option</option>
                                {TypeofProperty && TypeofProperty.map((e) => (
                                    <option className="form-control mt-2" key={e.id} value={e.PropertyType}>{e.PropertyType}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                            <label style={{ fontWeight: 'bold' }}>Constrction Type</label><br />
                            <select className="form-select mt-2" id="ConstructionType" onChange={handleChange} required>
                                <option disabled selected>Select option</option>
                                <option value="RCCRate">Rcc Rate</option>
                                <option value="OtherPakkaRate">Other Pakka Rate</option>
                                <option value="KacchaRate">Kaccha Rate</option>
                                <option value="EmptyLandRate">EmptyLand Rate</option>
                            </select>
                        </div>
                        <div className="mx-2" style={{ width: '45%', padding: '8px' }} >
                            <label style={{ fontWeight: 'bold' }}>Agent</label><br />
                            <select className="form-select mt-2" id="createdBy" onChange={handleChange} required>
                                <option disabled selected>Select Name</option>
                                {agentdata && agentdata.map((e) => (
                                    <option className="form-control mt-2" value={e.FullName}>{e.FullName}</option>
                                ))}
                            </select>
                        </div> */}


                        <button type="submit" className="form-control mt-2 btn btn-success my-2"
                            style={{
                                height: "3rem",
                                width: '11rem',
                                color: 'white',
                                backgroundColor: '#f1772e',
                                border: 'none',
                                borderRadius: '10px',
                            }}
                        >
                            Find Customer
                        </button>

                    </form>
                </div>

                <div style={{ padding: '10px' }}>
                    <div style={{ display: 'flex', width: '100%',  flexWrap: "wrap", padding: '3%', borderRadius: '20px', backgroundColor: '#f2f4f7', marginTop: '10px', overflowX: 'auto' }}>
                        {
                            renderdata.length > 0 &&
                            <>
                                <CSVLink data={CSVDATA} target="blank" onClick={onSavefile} className='my-3 btn btn-primary' style={{ width: '20vw' }}> Download Excel</CSVLink>

                                <button className="my-3 mx-2 btn btn-primary" onClick={() => handleDownloadPDF('printableTable')}>Download PDF</button>
                            </>
                        }
                        <table className='table table-responsive-lg table-bordered '   >
                            <thead className="table-primary">
                                <tr>
                                    <th>Sr.no</th>
                                    <th>Consumer No</th>
                                    {/* <th>PMC Number</th> */}
                                    <th>Customer Name</th>
                                    <th>Plot_No</th>
                                    <th>Total Area</th>
                                    {/* <th>Square Feet</th> */}
                                    {/* <th>Floors</th> */}
                                    {/* <th>Property Type</th>
                                    <th>Construction Type</th> */}
                                    {/* <th>ARV</th> */}
                                    {/* <th>Property Age</th> */}
                                    {/* <th>Location</th>
                                    <th>Ward</th>
                                    <th>Zone</th> */}
                                    {/* <th>Road Width</th>
                                    <th>Document Photos</th>
                                    <th>Created By</th>
                                    <th>Total ARV</th>
                                    <th>AVR effective From</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    renderdata.length > 0 ? (<Pagination data={renderdata} perPageItems={10} func={cards} searchparam={["FullName"]}></Pagination>
                                    ) : (
                                        <tr>
                                            <td colSpan="19" className="text-center">No data available</td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>

                        {/* table for pdf */}
                        <table id="printableTable" hidden className='table table-responsive table-bordered' ref={targetRef} >
                            <thead>
                                <tr style={{ backgroundColor: '#f8cbac' }}>
                                    <th rowSpan={2}>Sr.no</th>
                                    <th rowSpan={2}>Consumer No</th>
                                          <th rowSpan={2}>Plot_No</th>
                                          <th rowSpan={2}>Ward</th>
                                        <th rowSpan={2}>Mohalla</th>
                                    <th rowSpan={2}>Customer Name</th>
                                    <th rowSpan={2}>Father/Gaurdian Name</th>
                                    <th rowSpan={2}>Contact Number</th>
                                    <th rowSpan={2}>Road Width</th>
                                    <th rowSpan={2}>Property Tax</th>
                                    <th rowSpan={2}>Water Tax</th>
                                    <th rowSpan={2}>Property Age</th>
                                    <th colSpan={3} style={{ textAlign: 'center' }}>Connections</th>
                                    <th rowSpan={2}>Location</th>
                                    <th rowSpan={2}>Total ARV</th>
                                    <th rowSpan={2}>AVR effective From</th>
                                    {/* Dynamically add document columns */}
                                    {Array.from({ length: maxDocuments }).map((_, i) => (
                                        <th key={i} rowSpan={2}>{`Image ${i + 1}`}</th>
                                    ))}
                                </tr>
                                <tr style={{ backgroundColor: '#f8cbac' }}>
                                    <th>Electricity Connection</th>
                                    <th>Water Connection</th>
                                    <th>Sewer Connection</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(groupedData) && groupedData.length > 0 ? (
                                    groupedData.map((e, index) => (
                                        <tr key={index}>
                                            <td>{e.Srno}</td>
                                            <td>{e.PropertyID}</td>
                                            <td>{e.Plot_No}</td>
                                            <td>{e.Ward}</td>
                                            <td>{e.Mohalla}</td>
                                            <td>{e.FullName}</td>
                                            <td>{e.FatherorGaurdianName}</td>
                                            <td>{e.ContactNumber}</td>
                                            <td>{e.Meter}</td>
                                            <td>{e.PropertyTax}</td>
                                            <td>{e.WaterTax}</td>
                                            <td>{e.PropertyAge}</td>
                                            <td>{e.ElectricityConnection}</td>
                                            <td>{e.WaterConnection}</td>
                                            <td>{e.SewerConnection}</td>
                                            <td>{e.location}</td>
                                            <td>{e.TotalArv}</td>
                                            <td>{e.createdOn}</td>
                                            {/* {Array.from({ length: maxDocuments }).map((_, i) => (
                                                <td key={i}>
                                                    {e.documents[i] ? (
                                                        <img
                                                            style={{ borderRadius: '20px', width: '80px', marginBottom: '1rem' }}
                                                            src={backend + "/CustomerDocuments/" + e.documents[i]}
                                                        />
                                                    ) : (
                                                        // Empty cell if no document for this index
                                                        <span>No image</span>
                                                    )}
                                                </td>
                                            ))} */}
                                            {e.documents && e.documents
                                                .filter(doc => doc) // Filters out empty or null documents
                                                .map((doc, i) => (
                                                    <td key={i}>
                                                        <img
                                                            style={{ borderRadius: '20px', width: '80px', marginBottom: '1rem' }}
                                                            src={backend + "/CustomerDocuments/" + doc}
                                                            alt={`Document ${i}`}
                                                        />
                                                    </td>
                                                ))}
                                        </tr>
                                    ))) : (
                                    <tr>
                                        <td colSpan="19" className="text-center">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GetReport
