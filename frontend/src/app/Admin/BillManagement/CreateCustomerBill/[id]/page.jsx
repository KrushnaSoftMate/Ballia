"use client";
import React, { useEffect, useContext, useState } from "react";
import { Admin } from "@/app/AdminContext/AdminManageMent";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  const { GenerateBill, GetCustomerData, CreateBill, GetCustomerBillData } = useContext(Admin);
  const [Customer, SetCustomer] = useState();
  const [Bill, SetBill] = useState([]);
  const [Total, SetTotal] = useState(0);
  const [Form, SetForm] = useState([]);
  const [dyanamicgem, setdyanamicgem] = useState([]);
  const [AlreadyGeneratedBill, setAlreadyGeneratedBill] = useState([]);
  const navigate = useRouter()
  useEffect(() => {
    GetDaTa();
    return () => { };
  }, []);

  async function GetDaTa() {
    let CustomerData = await GetCustomerData(params.id);
    let CustomerBillData = await GetCustomerBillData(params.id);
    console.log(CustomerData);
    console.log("Customer Bill Data :: ", CustomerBillData);
    setAlreadyGeneratedBill(CustomerBillData);
    let data = await GenerateBill(CustomerData[0]);
    console.log("sdsz", data);
    SetCustomer(CustomerData[0]);
    let totalAmount = parseFloat(data.pop());
    SetTotal(isNaN(totalAmount) ? 0 : totalAmount); // Default to 0 if NaN
    SetBill(data);
  }

  function handleChange(e) {
    SetForm({ ...Form, [e.target.id]: e.target.value });
    const filtered = Bill.filter((x) => { return x.TaxName == e.target.id })
    if (filtered[0]) {
      setdyanamicgem({ ...dyanamicgem, [e.target.id]: e.target.value })
    }


  }
  function CalculateTotal() {
    var values = 0;
    Object.values(Form).forEach((x) => {
      if (Number(x)) {
        values = values + Number(x);
      }
    });
    SetTotal(values);
  }


  async function Submit(e) {

    const selectedFrom = Form.FromDate;
    const selectedTo = Form.ToDate;

    const formatDate = (isoDate) => isoDate?.split("T")[0];

    for (let i = 0; i < AlreadyGeneratedBill.length; i++) {
      const existingFrom = formatDate(AlreadyGeneratedBill[i].FromDate);
      const existingTo = formatDate(AlreadyGeneratedBill[i].ToDate);

      if (selectedFrom === existingFrom && selectedTo === existingTo) {
        alert(`Bill already generated for these year !! Bill ID : ${AlreadyGeneratedBill[i].BillNumber} And End Date is ${existingTo.split("T")[0]}`);
        return;
      }

      if (
        selectedFrom === existingFrom &&
        new Date(selectedTo) < new Date(existingTo)
      ) {
        alert(`Bill already generated for these year !! Bill ID : ${AlreadyGeneratedBill[i].BillNumber} And End Date is ${existingTo.split("T")[0]}`);
        return;
      }
    }



    e.preventDefault();
    let obj = {
      ...Form,
      ...Customer,
      Amount: Total,
      TaxRate: Bill[0].rate
    };
    console.log("Submitting Data :: ", obj);
    let result = await CreateBill(obj, dyanamicgem)
    if (result) {
      alert('Created Succesfully');
      navigate.push('/Admin/BillManagement/CreateCustomerBill/')
    } else {
      alert('duplicate')
    }
  }
  useEffect(() => {
    return () => { };
  }, [Total]);
  const handleBack = () => {
    navigate.push('/Admin/BillManagement/CreateCustomerBill/')
  }
  return (
    <>


      <div className="col-12">
        <div className="mx-2" style={{ width: '100%', padding: '4px' }} >
          < button className="form-control mt-2 btn btn-primary " style={{ width: '10%', borderRadius: '20px' }} onClick={(e) => { handleBack(e) }}>Back</button>
        </div>
        <div className="my-2" style={{ paddingLeft: "5rem", paddingRight: "5rem" }}>
          <form onSubmit={Submit}>
            {
              Customer &&
              <table
                border="1"
                cellpadding="0"
                cellspacing="0"
                style={{
                  borderCollapse: "collapse",
                  lineHeight: "20px",
                  width: "100%",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      colSpan="7"
                      align="center"
                      style={{ color: "black", paddingTop: "4px" }}
                      className="p1 ft1"
                    >
                      <img
                        src="/BALLIA-Logo512.png"
                        width="80"
                        height="70"
                        align="left"
                      />
                      <strong>
                        <span style={{ fontSize: "large", color: "Red" }}>
                          MUNICIPAL CORPORATION
                        </span>
                        <br />
                        PROPERTY TAX BILL {Date().split(" ")[3]}
                        <br />
                        (propertytax.org)
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
                      <strong>Property ID: </strong>
                    </td>
                    <td className="style2">
                      <span id="lbl_propertytaxno">{Customer?.PropertyID}</span>
                    </td>
                    <td className="style2">
                      <strong>From Date</strong>
                    </td>
                    <td className="style2">
                      <span id="lbl_financialyear">
                        <input autoComplete="off"
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
                        <input autoComplete="off"
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
            }
            {
              Customer &&
              <table
                border="1"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                className="p2 ft3"
                style={{ borderCollapse: "collapse", lineHeight: "20px" }}
              >
                <tbody>
                  <tr>
                    <td
                      colSpan="2"
                      align="center"
                      style={{
                        background:
                          "linear-gradient(to bottom, #7abcff 0%, #60abf8 44%, #4096ee 100%)",
                        color: "white",
                      }}
                      className="p1 ft1"
                    >
                      <strong>OWNER DETAILS</strong>
                    </td>
                  </tr>
                  <tr className="p2 ft3">
                    <td>
                      <strong> Name: </strong>
                    </td>
                    <td>
                      <span id="lbl_name">{Customer?.FullName}</span>
                    </td>
                  </tr>
                  <tr className="p2 ft3">
                    <td>
                      <strong> Address: </strong>
                    </td>
                    <td>
                      <span id="lbl_address">{Customer?.locality}</span>
                    </td>
                  </tr>
                  <tr className="p2 ft3">
                    <td>
                      <strong> Property location :</strong>
                    </td>
                    <td>
                      <span id="lbl_pdescription">{Customer?.location}</span>
                    </td>
                  </tr>
                  <tr className="p2 ft3">
                    <td>
                      <strong> Property Area :</strong>
                    </td>
                    <td>
                      <span id="lbl_pdescription">{Customer?.TotalArea}</span>
                    </td>
                  </tr>
                  <tr className="p2 ft3">
                    <td>
                      <strong> Property Type :</strong>
                    </td>
                    <td>
                      <span id="lbl_pdescription">{
                        Customer &&
                          Customer.PropertyType == 1 ? "Residential" : "Commercial"
                      }</span>
                    </td>
                  </tr>
                  <tr className="p2 ft3">
                    <td>
                      <strong> Total ARV :</strong>
                    </td>
                    <td>
                      <span id="lbl_pdescription">{Customer?.TotalARV}</span>
                    </td>
                  </tr>
                  {/* <tr className="p2 ft3">
                <td>
                  <strong>Total ARV :</strong>
                </td>
                <td>
                  <span id="lbl_pdescription">
                    {Customer?.TotalARV}
                  </span>
                </td>
              </tr> */}
                </tbody>
              </table>
            }

            <table
              id="tbl_bill"
              border="1"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              className="p2 ft3"
              style={{ borderCollapse: "collapse", lineHeight: "20px" }}
            >
              <tbody>
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
                {Bill &&
                  Bill.map((e) => (
                    <tr>
                      <td style={{ width: "25%", textAlign: 'center' }}>
                        <b>{e.TaxName}</b>
                      </td>
                      <td style={{ width: "25%" }} align="center">
                        <span id="lbl_genTax2">
                          <input autoComplete="off"
                            id={e.TaxName}
                            type="number"
                            placeholder={e.amountrate}
                            style={{ textAlign: "center" }}
                            onChange={handleChange}
                            required
                          ></input>
                        </span>
                      </td>
                    </tr>
                  ))}
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
                      <input autoComplete="off"
                        type="number"
                        placeholder={Total?.Total ? Total?.Total : Total}
                        style={{ textAlign: "center" }}
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
                width: "100%",
              }}
            >
              <tbody>
                <tr>
                  <td
                    colSpan="7"
                    align="center"
                    style={{ color: "black", paddingTop: "4px" }}
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
                        className="btn btn-primary my-3"
                        onClick={() => CalculateTotal()}
                      >
                        CalculateTotal
                      </span>
                      <span style={{ fontSize: "large", color: "Black" }}>
                        Total :-
                      </span>
                      Amount Need To be Paid : {Total?.Total ? Total?.Total : Total}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>

            <button
              type="submit"
              className="btn btn-danger my-3 form-control"
              onClick={() => CalculateTotal()}
            >
              Generate Bill
            </button>
          </form>
        </div>
      </div>

    </>
  );
};

export default Page;