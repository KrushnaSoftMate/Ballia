'use client'
import React, { useContext, useRef, useState } from 'react'

import { Agent } from '@/app/AdminContext/AgentManagement'
import Link from 'next/link'

const page = () => {

  const { GetPermitBill } = useContext(Agent)
  const formRef = useRef(null);
  const billnum = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [customerbill, SetCustomerBill] = useState([])

  async function GetBill(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      let data = await GetPermitBill(billnum.current.value)
      SetCustomerBill(data);
    } catch (error) {
      console.error("Error fetching bill:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    formRef.current.reset();
  }

  return (
    <>

      <div>

        <div>
          <div style={{ display: 'flex' }}>
            <h5><b>Update Permit Bill</b></h5>

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
            <form ref={formRef} onSubmit={GetBill}>
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
                    <b>Update Permit Bill</b>
                  </h5>
                  <input
                    type="text"
                    ref={billnum}
                    className="col-sm-6"
                    style={{
                      padding: '5px',
                      borderRadius: '10px',
                      borderColor: 'rgb(212, 212, 212)',
                    }}
                    required
                    placeholder="Enter Customer Bill Number"
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
                        {isLoading ? 'Loading...' : 'Find Bill'}
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
                    <th rowspan="1">Bill Number</th>
                    <th rowspan="3">Full Name</th>
                    <th rowspan="3">Contact Number</th>
                    <th rowspan="4">Aadhar Number</th>
                    <th rowspan="4">Pan Number</th>
                    <th rowspan="4">Gala</th>
                    <th rowspan="4">Permit Type</th>
                    <th rowspan="4">Rate</th>
                    <th rowspan="4">From Date</th>
                    <th rowspan="4">To Date</th>
                    <th rowspan="4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {customerbill && customerbill.map((e) => (
                    <tr>
                      <td>{e.BillNumber}</td>
                      <td>{e.FullName}</td>
                      <td>{e.ContactNumber}</td>
                      <td>{e.AadharNumber}</td>
                      <td>{e.PanNumber}</td>
                      <td>{e.Gala}</td>
                      <td>{e.PermitType}</td>
                      <td>{e.Rate}</td>
                      <td>{e.FromDate}</td>
                      <td>{e.ToDate}</td>
                      <td>
                      <Link style={{ color: 'white', textDecoration: 'none', margin: '8px' }} href={"UpdatePermitBill/" + e.BillNumber}>
                        <button className="btn " style={{ backgroundColor: '#f1772e',width:'7rem' }}>
                          <img src="/Edit.png" style={{ width: '15px',marginRight:'5px' }}></img>
                            Edit Bill
                        </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page
