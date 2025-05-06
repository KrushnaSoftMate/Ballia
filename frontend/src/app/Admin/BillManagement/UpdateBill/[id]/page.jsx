"use client";
import React, { useEffect, useContext, useState, Suspense } from "react";
import { Admin } from "@/app/AdminContext/AdminManageMent";
import { render } from "react-dom";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  const { CustomerUpdateBill, UpdateBill, FindCustomer, CreateBill } = useContext(Admin);
  const [Customer, SetCustomer] = useState();
  const [renderdata, setRenderData] = useState([]);
  var [Total, SetTotal] = useState(0);
  var [Form, SetForm] = useState({ LateFees: "" });
  const navigate = useRouter();
  useEffect(() => {
    GetDaTa();
    return () => { };
  }, []);

  async function GetDaTa() {
    let data = await UpdateBill(params.id, "getdata");
    console.log("data i get :: ", data);
    SetCustomer(data.customer[0]);
    setRenderData(data.BillBreakdown);
    let obj = { LateFees: data.customer[0]?.LateFees }
    let dat65 = data.BillBreakdown
    let Total = 0
    //here it make the total of the updated amount
    dat65 && dat65.map((xe) => {
      if (xe.Particulars == 'Total') { return }
      obj[xe.Particulars] = xe.Amount
      Total += parseInt(xe.Amount)
    })
    SetForm(obj)
    SetTotal(Total)
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

  useEffect(() => {
    CalculateTotal();
  }, [Form]);



  async function Submit(e) {
    e.preventDefault();


    let obj = {
      ...Form,
      ...Customer,
      Amount: Total,
      OtherLateFees: Form.LateFees,
    };

    console.log("Data Submitting :: ", obj)
    console.log("Bill Order :: ", Form);
    console.log("Render Data :: ", renderdata);
    let total = renderdata.filter((item) => item.Particulars == "Total")[0];
    console.log(Customer.TotalAmount)

    if (Total == Customer.TotalAmount) {
      alert("No Updates !!!");
      return;
    }

    let dynamicdata = { ...Form }
    delete dynamicdata["LateFees"]
    delete dynamicdata["TotalPaymentAmount"]
    let result = await CustomerUpdateBill(obj, dynamicdata)
    if (result) {
      alert("Updated");
      navigate.push('/Admin/BillManagement/UpdateBill/');
    }
    else {
      alert('issues')
    }

  }

  useEffect(() => {
    return () => { };
  }, [Total]);

  const GoBack = (e) => {
    e.preventDefault();
    navigate.push('/Admin/BillManagement/UpdateBill/');
  }


  return (

    <div className="my-5" style={{ paddingLeft: "5rem", paddingRight: "5rem" }}>
      <form>
        {
          Customer &&
          (
            <>

              <Suspense fallback={<>Error</>} >
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
                        {/* <img
                      src="https://cdnbbsr.s3waas.gov.in/s3cd4bb35c75ba84b4f39e547b1416fd35/uploads/2021/06/2021062689-300x300.jpg"
                      width="80"
                      height="70"
                      align="left"
                    /> */}
                        <strong>
                          <span style={{ fontSize: "large", color: "Red" }}>
                            BALLIA MUNICIPAL CORPORATION
                          </span>
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
                        <strong>Property ID: </strong>
                      </td>
                      <td className="style2">
                        <span id="lbl_propertytaxno">
                          {Customer?.PropertyID}
                        </span>
                      </td>
                      <td className="style2">
                        <strong>From Date</strong>
                      </td>
                      <td className="style2">
                        <span id="lbl_propertytaxno">
                          {Customer?.FromDate}
                        </span>
                      </td>
                      {/* <td className="style2">
                  <span id="lbl_financialyear">
                    <input
                      type="date"
                      id="FromDate"
                      onChange={handleChange}
                      className="form-control"
                      required
                    ></input>
                  </span>
                </td> */}
                      <td className="style2">
                        <strong>To Date</strong>
                      </td>
                      <td className="style2">
                        <span id="lbl_propertytaxno">
                          {Customer && Customer.ToDate.split("T")[0]}
                        </span>
                      </td>
                      {/* <td className="style2">
                  <span id="lbl_financialyear">
                    <input
                      type="date"
                      id="ToDate"
                      onChange={handleChange}
                      className="form-control"
                      required
                    ></input>
                  </span>
                </td> */}
                    </tr>
                  </tbody>
                </table>
                {/* Customer Details */}
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
                        <span id="lbl_address">{Customer?.Address}</span>
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
                        <strong> Property TaxType :</strong>
                      </td>
                      <td>
                        <span id="lbl_pdescription">
                          {Customer.PropertyType == 1 ? "Residential" : "Commercial"}
                        </span>
                      </td>
                    </tr>
                    <tr className="p2 ft3">
                      <td>
                        <strong>Tax Rate :</strong>
                      </td>
                      <td>
                        <span id="lbl_pdescription">
                          {Customer.TaxRate ? Customer.TaxRate : "--"}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* Billing data */}
                <table
                  id="tbl_bill"
                  className="table table-striped table-hover table-borderless table-primary align-middle p2 ft3"
                  border="1"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"

                  style={{ borderCollapse: "collapse", lineHeight: "20px" }}
                >
                  <tbody>
                    <tr>
                      <td
                        colspan="5"
                        align="center"
                        className="p2 ft1"
                        style={{
                          background:
                            "linear-gradient(rgb(122, 188, 255) 0%, rgb(96, 171, 248) 44%, rgb(64, 150, 238) 100%)",
                          color: "white",
                        }}
                      >
                        <strong>PROPERTY TAX BILL</strong>
                      </td>
                    </tr>
                    <tr align="center">
                      <td colspan="1" style={{ width: "30%" }}>
                        <b>Tax Head</b>
                      </td>
                      <td colspan="1" style={{ width: "23%" }}>
                        <b>Total</b>
                      </td>
                    </tr>
                    <Suspense>
                      {
                        renderdata && renderdata.map((xe) => {
                          if (xe.Particulars == 'Total') {
                            return
                          }

                          return (
                            <tr>
                              <td style={{ width: "25%", textAlign: "center" }}>

                                <b>{xe.Particulars}</b>
                              </td>
                              <td align="center" style={{ width: "25%" }}>
                                <input className="form-control" onChange={(e) => { SetForm({ ...Form, [e.currentTarget.id]: e.currentTarget.value }) }} id={xe.Particulars} placeholder={xe.Amount} value={Form[xe.Particulars]}></input>
                              </td>
                            </tr>
                          )


                        })
                      }
                    </Suspense>
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
                            className="form-control"
                            id="LateFees"
                            type="number"
                            placeholder={Total?.Total ? Total?.Total : Total}
                            style={{ textAlign: "center" }}
                            disabled
                          ></input>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "25%", textAlign: "center" }}>
                        <b>Total Amount Paid</b>
                      </td>
                      <td align="center" style={{ width: "25%" }}>
                        <span id="lbl_genTax2">{Customer?.PaidAmount}</span>
                      </td>
                    </tr>

                  </tbody>
                </table>




                {/* Footer */}
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
                        style={{ color: "black", paddingTop: "4px", textAlign: 'center' }}
                        className="p1 ft1"
                      >
                        {/* <img
                      src="https://logowik.com/content/uploads/images/787_total.jpg"
                      width="80"
                      height="70"
                      align="left"
  
                    /> */}
                      </td>


                      {/* <span className="btn btn-success form-control" onClick={CalculateTotal}>Make Total</span> */}


                      <br />
                      <strong style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: "large", color: "Black" }}>
                          Remaining :
                        </span>
                        Amount Need To be Paid : {Total}
                      </strong>
                    </tr>
                  </tbody>
                </table>
              </Suspense>
              <div className="col-11 m-auto my-3 text-center">
                <button className="btn btn-primary" onClick={(e) => { Submit(e) }}>Update Bill</button>

                <button className="btn btn-danger px-4 mx-4" onClick={(e) => { GoBack(e) }}>Back</button>

              </div>
            </>
          )
        }
      </form>

      {/* <div
        className="table-responsive"
      >
        <table
          className="table table-striped table-hover table-borderless table-primary align-middle"
        >
          <thead className="table-light">
            <caption>
              Table Name
            </caption>
            <tr>
              <th>Column 1</th>
              <th>Column 2</th>
              <th>Column 3</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            <tr
              className="table-primary"
            >
              <td scope="row">Item</td>
              <td>Item</td>
              <td>Item</td>
            </tr>
            <tr
              className="table-primary"
            >
              <td scope="row">Item</td>
              <td>Item</td>
              <td>Item</td>
            </tr>
          </tbody>
          <tfoot>
            
          </tfoot>
        </table>
      </div> */}

    </div>
  );
};

export default Page;
