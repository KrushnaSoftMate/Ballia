"use client";
import React, {
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Agent } from "@/app/AdminContext/AgentManagement";
import Link from "next/link";

const Page = () => {
  const { GetCustomerLicense } = useContext(Agent);
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
      const data = await GetCustomerLicense(customernum.current.value);
      console.log(data);
      SetCustomer(data);
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
              <div
                className="col"
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  flexWrap: 'wrap',
                }}
              >
                <h5 htmlFor="NI_Type" className="form-label col-sm-2" style={{ textAlign: 'center', padding: '8px 0px', fontSize: '15px' }}>
                  <b>Generate License Bill</b>
                </h5>
                <input
                  type="text"
                  ref={customernum}
                  className="col-sm-6"
                  style={{
                    padding: '5px',
                    borderRadius: '10px',
                    borderColor: 'rgb(212, 212, 212)',
                  }}
                  required
                  placeholder="Enter Customer Reference Number"
                ></input>
                <div className="col-sm-3" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
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
                        height: "3rem",
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
                        height: "3rem",
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
                  <th rowspan="1">Sr. No.</th>
                  <th rowspan="3">Gala No.</th>
                  <th rowspan="3">Customer Name</th>
                  <th rowspan="3">Aadhar Number</th>
                  <th rowspan="3">Pan Number</th>
                  <th rowspan="3">Permit Type</th>
                  <th rowspan="4">Action</th>
                </tr>
              </thead>
              <tbody>
                {Customer && Customer.map((e) => (
                  <tr>
                    <td>{e.ID}</td>
                    <td>{e.Gala}</td>
                    <td>{e.FullName}</td>
                    <td>{e.AadharNumber}</td>
                    <td>{e.PanNumber}</td>
                    <td>{e.PermitType}</td>
                    <td style={{display:"flex",justifyContent:"space-between"}}>
                      <button className="btn" style={{ backgroundColor: '#f1772e' }} onClick={() => SetLoading(true)}>
                        <Link style={{ color: 'white', textDecoration: 'none' }} href={"CreateBill/" + e.Gala}>
                          Generate Bill
                        </Link>
                      </button>
                      {
                        loading ? (<div style={{ display: "grid", justifyContent: "center", }}>
                          <div className="loader" style={{ alignSelf: "center", justifySelf: "center" }}></div>
                          {/* <h2>Loading.......</h2> */}
                        </div>) : ''
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* <nav aria-label="Page navigation example" style={{ display: 'flex', justifyContent: 'end' }}>
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
        </nav> */}
      </div>
    </div>
  );
};

export default Page;
