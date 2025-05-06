'use client'
import React, { useContext, useState, useEffect } from 'react'
import { Agent } from '../../../AdminContext/AgentManagement'
import Pagination from '@/Components/pagination'
import { CSVLink } from 'react-csv'
const page = () => {
  const { GetCustomerList, GetDocumentForm } = useContext(Agent)
  const [Helper, SetHelper] = useState([]);
  const [Customer, Setcustomer] = useState();
  const [locality,setlocalty]=useState(null)
  const [CSVDATA, SetCSVDATA] = useState([])
  const [s,sets]=useState(false)
  function onSavefile() {
    if (Customer.length > 0) {
      const headers = Object.keys(Customer[0]);
      const csvData = Customer.map(item => headers.map(key => item[key]));
      const finalcsv = [headers, ...csvData];
      SetCSVDATA(finalcsv);
    }
  }

  useEffect(() => {
    Getdata()
    sets(Math.random())
    return () => { }
  }, [locality])

  async function Getdata() {
    let helper = await GetDocumentForm()
    SetHelper(helper?.locality)
  }

  async function SubmitLocality(x) {
    Setcustomer(false);
    let datalocality = await GetCustomerList(x)
    Setcustomer(datalocality);
  }

  function cards(data) {
    return (
      <tr
        class="table-primary"
      >
         <th>{data?.PropertyID}</th>
        <th>{data?.FullName}</th>
        <th>{data?.TotalArea}</th>
        <th>{data?.Area_Use}</th>
        <th>{data?.location}</th>
        <th>{data?.Ward}</th>
        <th>{data?.Zone}</th>
        <th>{data?.Meter}</th>
        <th>{data?.locality}</th>
        <th>{data?.ContactNumber}</th>
        <th>{data?.AadharNumber}</th>
        <th>{data?.PanNumber}</th>
      </tr>

    )
  }
  return (
    <>
      <div style={{ display: "grid" }}>
        <select onChange={(x) =>{setlocalty(x.currentTarget.value); }} style={{ margin: "20px" }}>
          <option value={null} selected disabled>Select Locality</option>
          {Helper.map((e) => (
            <option value={e.uniqueness}>{e.uniqueness}</option>
          ))}
        </select>
        <button className='btn btn-dark mx-4' style={{width:'20vw'}} onClick={(e)=>SubmitLocality(locality)}>Get Customers</button>
        <input type='search' placeholder='Search Customers here' className='form-control mx-5  my-3' style={{width:'50vw',textAlign:'center',background:'#f2f4f7'}} onChange={(e)=>sets(e.currentTarget.value)}></input>
      
        <div
          class="table-responsive"
        >
          <table
            class="table table-striped table-hover table-borderless table-primary align-middle mt-2"
          >
            <thead class="table-light">
             
              <tr>
                <th>Property Id</th>
                <th>FullName</th>
                <th>TotalArea</th>
                <th>Area_Use</th>
                <th>location</th>
                <th>Ward</th>
                <th>Zone</th>
                <th>Meter</th>
                <th>locality</th>
                <th>ContactNumber</th>
                <th>AadharNumber</th>
                <th>PanNumber</th>
              </tr>
            </thead>
            <tbody class="">

              {Array.isArray(Customer) && (<Pagination data={Customer} perPageItems={15} func={cards}  searchparam={["FullName"]} searchword={s} useeffectactive={locality}></Pagination>)}
            </tbody>

          </table>
        </div>
        <CSVLink data={CSVDATA} target="blank" onClick={onSavefile} className='my-3 btn btn-primary' style={{ margin: "20px" }}> Download Excel</CSVLink>
      </div>
    </>
  )
}

export default page