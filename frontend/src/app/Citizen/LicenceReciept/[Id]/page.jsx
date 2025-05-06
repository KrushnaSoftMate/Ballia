'use client'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { Customer } from '@/app/AdminContext/CustomerManagement'
import { usePDF } from 'react-to-pdf'

const page = ({ params }) => {

    const statecalls = useContext(Customer)
    const { GetReciept, GetPermitReciept } = statecalls
    const [renderdata, setRenderData] = useState([])
    const [permitdata, setPermitData] = useState([])
    const { toPDF, targetRef } = usePDF({ filename: 'Reciept.pdf' });

    useEffect(() => {
        Reciept()
    }, [])
    async function Reciept() {
        const data = await GetReciept(params.id);
        const data1 = await GetPermitReciept(params.id);
        setPermitData(data1[0])
        setRenderData(data[0]);
    }
    const RenderFromDate = renderdata?.FromDate || permitdata?.FromDate?.split('T')[0]
    const RenderToDate = renderdata?.ToDate?.split('T')[0] || permitdata?.ToDate?.split('T')[0]
    const Renderadded = renderdata?.addedon?.split('T')[0] || permitdata?.addedon?.split('T')[0]

    return (
        <>
            <div style={{ padding: "20px" }}>
                <div ref={targetRef} style={{ border: "2px solid black", padding: "10px", display: "grid" ,background:"white" }}>
                <div className="container mt-4 p-4 border rounded shadow">
      <div className="row">
        <div className="col">
          <p><strong>From No. 2/100</strong></p>
          <p>Book No. <strong>09</strong> Counterfoil of License</p>
          <h5 className="fw-bold">नगरपालिका परिषद</h5>
        </div>
        <div className="col text-end">
          <p>No. <strong>687</strong></p>
          <p>बुक न. <strong>07</strong></p>
        </div>
      </div>

      <h3 className="text-center fw-bold">LICENSE</h3>
      <h5 className="text-center fw-bold">नगरपालिका परिषद</h5>

      <div className="mt-3">
        <p><strong>Date:</strong> ..........21</p>
        <p className="fw-bold">WHEREAS</p>
        <p>HE is permitted to ......................................</p>
        <p>Within the NagarPalika a Parisad of ...................</p>
      </div>

      <h5 className="fw-bold mt-4">Description of Licencer</h5>
      <table className="table table-bordered mt-2">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Father's Name</th>
            <th>Caste</th>
            <th>Trade</th>
            <th>Address</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>_________________</td>
            <td>_________________</td>
            <td>_________________</td>
            <td>_________________</td>
            <td>_________________</td>
            <td>_________________</td>
          </tr>
        </tbody>
      </table>

      <div className="mt-4">
        <p><strong>Name of Licence:</strong> __________________</p>
        <p><strong>Father's Name:</strong> __________________</p>
        <p><strong>Address:</strong> __________________</p>
        <p><strong>Caste:</strong> __________________</p>
        <p><strong>Trade:</strong> __________________</p>
        <p><strong>Purpose of Licence:</strong> __________________</p>
        <p><strong>Date of Licence:</strong> __________________</p>
        <p><strong>Period Licence:</strong> __________________</p>
        <p><strong>Amount's Paid:</strong> __________________</p>
      </div>

      <div className="mt-3">
        <p><strong>Signature of Licensing Officer:</strong> __________________</p>
        <p><strong>Progressive Total Rs:</strong> __________________</p>
      </div>

      <p className="mt-2 text-muted">
        <strong>Note:</strong> The site and cement should be entered when the License is conditional.
        The endorsement should be canceled when the License is of a general nature.
      </p>
    </div>
                </div>
                <div>
                    <button onClick={toPDF} className='btn btn-success form-control my-3'>Print Reciept</button>
                </div>
            </div>
        </>
    )
}

export default page