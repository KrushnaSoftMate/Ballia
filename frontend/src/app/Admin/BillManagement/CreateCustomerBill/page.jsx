"use client";
import React, {
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Admin } from "@/app/AdminContext/AdminManageMent";
import Link from "next/link";
import './page.css';

const Page = () => {
  const { GetCustomerData } = useContext(Admin);
  const customernum = useRef();
  const formRef = useRef(null);
  const [Customer, SetCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, SetLoading] = useState(false)
  useEffect(() => {
    return () => { };
  }, []);

  async function GetCustomer(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const trimmedCustomerNumber = customernum.current.value?.trim(); // Trim white spaces
      console.log("trimmedCustomerNumber", trimmedCustomerNumber);
      const data = await GetCustomerData(trimmedCustomerNumber);
      SetCustomer(data);
      console.log("data Krushna,::", data);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    formRef.current.reset(); // Reset the form
    SetCustomer([]); // Clear the Customer data
  }

  return (
    <div style={{ backgroundColor: '#f2f4f7', height: '100vh', padding: '50px' }}>
      <div>
        <div>
          <h5><b>Create Bill</b></h5>
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
                <h5 className="form-label " style={{ textAlign: 'center', padding: '8px 0px', fontSize: '15px' }}>
                  <b>Generate Customer Bill</b>
                </h5>
                <input type="text" ref={customernum} className="col-sm-4" style={{ padding: '5px', borderRadius: '10px', borderColor: 'rgb(212, 212, 212)', }}
                  required
                  placeholder="Enter Customer Reference Number"
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
          <div style={{ backgroundColor: '#f6f8fc', padding: '5px', overflow: 'auto' }}>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>Sr. No.</th>
                  <th style={{ width: "20%" }}>Customer No.</th>
                  <th style={{ width: "20%" }}>Customer Name</th>
                  <th style={{ width: "20%" }}>Status</th>
                  <th style={{ width: "10%" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  Customer.length > 0 ? (
                    Customer.map((e, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{e.PropertyID}</td>
                        <td>{e.FullName}</td>
                        <td className={e.Approvance != "Approved" ? "fw-bold text-danger" : "fw-bold text-success"}>{e.Approvance}</td>
                        <td style={{ display: "flex", justifyContent: "space-between" }}>
                          {
                            e.Approvance == "Approved" ?
                              (
                                <>
                                  <button className="btn" style={{ backgroundColor: '#f1772e' }} onClick={() => SetLoading(true)}>
                                    <Link style={{ color: 'white', textDecoration: 'none' }} href={"CreateCustomerBill/" + e.PropertyID}>
                                      Generate Bill
                                    </Link>
                                  </button>

                                  {
                                    loading ? (<div style={{ display: "grid", justifyContent: "center", }}>
                                      <div className="loader" style={{ alignSelf: "center", justifySelf: "center" }}></div>
                                      {/* <h2>Loading.......</h2> */}
                                    </div>) : ''
                                  }
                                </>
                              ) : (
                                <p>--</p>
                              )
                          }
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="fw-bold text-center">No Data !!!</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
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




    //   <div>
    //   <div className="card">
    //     <div className="card-body">
    //       <h5>Generate Customer Bill</h5>
    //       <input
    //         type="text"
    //         ref={customernum}
    //         className="form-control"
    //         placeholder="enter Customer Reference Number"
    //       ></input>
    //       <button className="btn btn-success my-2" onClick={GetCustomer}>
    //         Find Customer
    //       </button>
    //     </div>
    //   </div>
    //   <div className="card">
    //     <div className="card-body">
    //       <h5>Customer List</h5>
    //       {Customer.map((e) => {
    //         return (
    //           <>
    //             {e.FullName}<br/>
    //             {e.PropertyID}
    //             <h5>customer number</h5>
    //             {e.PropertyID}
    //             <button className="btn btn-danger">
    //               <Link href={"CreateCustomerBill/" + e.PropertyID}>
    //                 Generate Bill
    //               </Link>
    //             </button>
    //           </>
    //         );
    //       })}
    //     </div>
    //   </div>
    // </div>

  );
};

export default Page;
