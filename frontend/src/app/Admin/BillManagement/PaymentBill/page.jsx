'use client'
import React, {
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Admin } from "@/app/AdminContext/AdminManageMent";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const { GetCustomerData, BillWhatsappPayment, GetCustomerBillData } = useContext(Admin);
  const customernum = useRef();
  const navigate = useRouter();
  const formRef = useRef(null);
  const [Customer, SetCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [CustomerForm, SetCustomerForm] = useState({
    Amount: "",
    Email: "",
    PhoneNumber: ""
  })
  useEffect(() => {
    return () => { };
  }, [Customer]);

  async function GetCustomer(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const trimmedCustomerNumber = customernum.current.value?.trim(); // Trim white spaces
      console.log("trimmedCustomerNumber", trimmedCustomerNumber);
      const data = await GetCustomerBillData(trimmedCustomerNumber);
      if (data.length > 0) {
        console.log("Data i get :: ", data);
        SetCustomer(data);
      }
      else {
        let res = window.confirm(`No bill found for this customer. Do you want to generate bill of ${customernum.current.value} !!!`);
        if (res == true) {
          navigate.push(`/Admin/BillManagement/CreateCustomerBill/`);
        }
        else {
          formRef.current.reset();
        }
        formRef.current.reset();
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function submit() {
    alert('link sent')
    let obj = {
      PropertyID: customernum.current.value,
      ...CustomerForm
    }
    const data = await BillWhatsappPayment(obj);
    // SetCustomer(data);
  }

  // async function submit1() {
  //   alert('link sent')
  //   const data = await BulkWhatsAppLink();
  //   console.log(data);
  // }
  async function Confirm() {
    let obj = {
      PropertyID: customernum.current.value,
      ...CustomerForm
    }
    const data = await BillWhatsappPayment(obj);
    SetCustomer(data);
  }
  function handleReset() {
    formRef.current.reset();
    SetCustomer([]);
  }

  return (
    <div style={{ backgroundColor: '#f2f4f7', height: '100vh', padding: '50px' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5><b>Send Payment Link</b></h5>
          <button type="button" className="btn btn-primary" >Send Bulk Payment Link</button>
        </div>
        <div
          style={{
            display: 'grid',
            border: '2px solid',
            borderRadius: '20px',
            border: 'none',
            padding: '30px',
            backgroundColor: 'white',
          }}
        >
          <form ref={formRef} onSubmit={GetCustomer}>
            <div
              className="col"
              style={{
                border: '1px solid #f1772e',
                backgroundColor: 'lightyellow',
                padding: '20px 0px',
                borderRadius: '10px'
              }}
            >
              <div className="col" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <h5 htmlFor="NI_Type" className="form-label" style={{ textAlign: 'center', padding: '8px 0px', fontSize: '14px' }}>
                  <b>Send Customer Bill Link</b>
                </h5>
                <input
                  type="text"
                  ref={customernum}
                  className="col-sm-4"
                  style={{
                    padding: '5px',
                    borderRadius: '10px',
                    borderColor: 'rgb(212, 212, 212)',
                  }}
                  required
                  placeholder="Enter Property Id Here"
                ></input>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                  <div style={{ position: 'relative', display: 'flex', paddingRight: "8px" }}>
                    <img
                      src="/Search.png"
                      alt="Search"
                      style={{
                        width: '15px',
                        position: 'absolute',
                        top: '30%',
                        left: "5%",
                        cursor: 'pointer',
                      }}
                    />
                    <button type="submit"
                      style={{
                        backgroundImage: '/loginimage.png',
                        height: "2.5rem",
                        width: '11rem',
                        color: 'white',
                        backgroundColor: '#f1772e',
                        border: 'none',
                        borderRadius: '10px',
                      }}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Loading...' : 'Find Customer'}
                    </button>
                  </div>
                  <div style={{ width: '10rem' }}>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn btn-primary form-control"
                      style={{
                        backgroundColor: '#e5e5e5',
                        height: "2.5rem",
                        width: '5rem',
                        color: '#757575',
                        border: 'none',
                        borderRadius: '10px',
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <div>
            <button
              style={{
                border: 'none',
                border: '1px solid #757575',
                borderRadius: '10px',
                color: '#757575',
                padding: '5px 10px 5px 10px',
              }}
            >
              <img src="/Export-to-Excel.png" alt="Export to Excel" style={{ width: '20px' }} />
              <b> Export to excel</b>
            </button>
          </div>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: '10px',
                backgroundColor: 'white',
                position: 'relative',
                background: 'transparent',
                marginRight: '10px',
              }}
            >
              <img
                src="/Search1.png"
                alt="Search"
                style={{
                  position: 'absolute',
                  left: '4%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
              />
              <input
                className="form-control"
                type="search"
                style={{ padding: '9px 40px', border: 'none', borderRadius: '10px' }}
                placeholder="Search"
              />
            </div>
            <button
              style={{
                border: 'none',
                border: '1px solid #757575',
                color: '#757575',
                padding: '5px',
                marginRight: '10px',
              }}
            >
              <img src="/1.png" alt="1" style={{ width: '25px' }} />
            </button>
            <button
              style={{
                border: 'none',
                border: '1px solid #757575',
                color: '#757575',
                padding: '5px',
                marginRight: '10px',
              }}
            >
              <img src="/2.png" alt="2" style={{ width: '25px' }} />
            </button>
            <button
              style={{
                border: 'none',
                border: '1px solid #757575',
                color: '#757575',
                padding: '5px',
                marginRight: '10px',
              }}
            >
              <img src="/3.png" alt="3" style={{ width: '25px' }} />
              <select style={{ border: 'none', background: 'transparent' }}></select>
            </button>
            <button style={{ border: 'none', border: '1px solid #757575', color: '#757575', padding: '5px' }}>
              <img src="/4.png" alt="4" style={{ width: '25px' }} />
              <select style={{ border: 'none', background: 'transparent' }}></select>
            </button>
          </div>
        </div> */}
        <div
          style={{
            display: 'grid',
            border: '2px solid',
            borderRadius: '20px',
            border: 'none',
            padding: '20px',
            backgroundColor: 'white',
            marginTop: '20px',
          }}
        >
          <div className="col-12" style={{ backgroundColor: '#f6f8fc', padding: '5px', overflow: 'auto' }}>
            <table className="col-12">
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>Sr. No.</th>
                  <th style={{ width: "15%" }}>Propety ID</th>
                  <th style={{ width: "20%" }}>Bill Number</th>
                  <th style={{ width: "20%" }}>Customer Name</th>
                  <th style={{ width: "15%" }}>Contact no</th>
                  <th style={{ width: "10%" }}>Amount</th>
                  <th style={{ width: "10%" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {Customer && Customer.map((e) => (
                  <tr>
                    <td>{e.Srno}</td>
                    <td>{e.PropertyID}</td>
                    <td>{e.BillNumber}</td>
                    <td>{e.FullName}</td>
                    <td>{e.ContactNumber}</td>
                    <td>{e.Amount}</td>
                    <td>
                      <button className="btn" style={{ backgroundColor: '#f1772e', color: 'white', marginRight: '12px' }} onClick={submit}>Send Link</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* <div>
              <div>

                {Customer && Customer.map((e) => {
                  return (
                    <>
                      <div className="row" style={{ paddingBottom: '12px' }}>
                        <div className="col">
                          <h5>Customer Name</h5>
                          <input type="text" className="form-control" placeholder={e.FullName} aria-label="First name" />
                        </div>
                        <div className="col">
                          <h5>Property ID</h5>
                          <input type="text" className="form-control" placeholder={e.PropertyID} aria-label="Last name" />
                        </div>
                      </div>

                      <div className="row" style={{ paddingBottom: '12px' }}>
                        <div className="col">
                          <h5>Customer Contact Number</h5>
                          <input type='number' className="form-control" id="PhoneNumber" value={CustomerForm.PhoneNumber} onChange={(e) => { SetCustomerForm({ ...CustomerForm, [e.target.id]: e.currentTarget.value }) }}></input>
                        </div>
                        <div className="col">
                          <h5>Amount</h5>
                          <input type='number' className="form-control" id="Amount" value={CustomerForm.Amount} onChange={(e) => { SetCustomerForm({ ...CustomerForm, [e.target.id]: e.currentTarget.value }) }}></input>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <h5>Email</h5>
                          <input type='email' className="form-control" id="Email" value={CustomerForm.Email} onChange={(e) => { SetCustomerForm({ ...CustomerForm, [e.target.id]: e.currentTarget.value }) }}></input>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'end', paddingTop: '15px' }}>
                        <button className="btn" style={{ backgroundColor: '#f1772e', color: 'white', marginRight: '12px' }} onClick={submit}>Send Link</button>
                        <button className="btn btn-success">Confirm Payment</button>
                      </div>
                    

                    </>
                  );
                })}
              </div>
            </div> */}

          </div>
        </div>
        <nav aria-label="Page navigation example" style={{ display: 'flex', justifyContent: 'end' }}>
          <ul className="pagination" style={{ marginTop: '20px' }}>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                style={{
                  color: '#757575',
                  borderColor: '#757575',
                  borderRadius: '50px',
                  marginRight: '10px',
                }}
              >
                &laquo; Previous
              </a>
            </li>
            <li className="page-item active mx-3">
              <a
                className="page-link"
                href="#"
                style={{
                  color: '#f1772e',
                  border: 'none',
                  backgroundColor: '#face25',
                  borderRadius: '50%',
                  marginRight: '10px',
                }}
              >
                1
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                style={{
                  color: '#f1772e',
                  borderColor: '#f1772e',
                  borderRadius: '50px',
                }}
              >
                Next &raquo;
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default page