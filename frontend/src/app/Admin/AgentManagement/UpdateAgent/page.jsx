'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Admin } from '@/app/AdminContext/AdminManageMent'
import Pagination from '@/Components/pagination';
 
const Page = () => {
  const { GetAgent, UpdateAgent } = useContext(Admin)
  const [searchData, setSearchData] = useState([])
  const [showAgent, setShowAgent] = useState([])
  const [formData, setFormData] = useState({})
  const [editingRowId, setEditingRowId] = useState(null);
  useEffect(() => {
    Agent()
  }, [])
 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
 
  async function Agent() {
    let data = await GetAgent()
    setShowAgent(data)
    setSearchData(data)
  }
 
  async function SetAgent() {
    await UpdateAgent(formData)
    alert("Agent Updated Successfully")
    Agent()
    setEditingRowId(null); // Close the editing form after update
  }
 
  const SearchAgent = (e) => {
    let searchValue = e.target.value.toLowerCase();
 
    if (!searchValue) {
      setShowAgent(searchData)
      return;
    }
 
    let newData = searchData.filter((item) => {
      return (
        item.AgentID.toLowerCase().includes(searchValue) ||
        item.FullName.toLowerCase().includes(searchValue) ||
        item.ContactNumber.toLowerCase().includes(searchValue)
      )
    });
    setShowAgent(newData)
  }
 
  const handleEditClick = (data) => {
    setEditingRowId(data.ID === editingRowId ? null : data.ID);
    setFormData(data);
  };
 
  const renderRow = (data) => (
    <>
      <tr key={data.ID}>
        <td>
          <button className='btn btn-primary' onClick={() => handleEditClick(data)}>
            {editingRowId === data.ID ? 'Close' : 'Edit'}
          </button>
        </td>
        <td>{data.ID}</td>
        <td>{data.AgentID}</td>
        <td>{data.FullName}</td>
        <td>{data.ContactNumber}</td>
        <td>{data.Email}</td>
        <td>{data.Password}</td>
        <td>{data.RoleID}</td>
        <td>{data.Role}</td>
        <td>{data.Moneylimit}</td>
        <td>{data.Address}</td>
        <td>{data.AadharNumber}</td>
        <td>{data.PanNumber}</td>
      </tr>
 
 
      {editingRowId === data.ID && (
        <tr >
          <td colSpan="13">
            <div className="edit-form" style={{ display: 'grid', margin: '4px',padding:'1rem',backgroundColor:"aliceblue",borderRadius:'15px' }}>
              <div style={{ marginTop: '15px', display: 'flex', gap: '40px', }}>
                <div style={{ flex: 1 }} className="form-row">
                  <label>Agent ID:</label>
                  <input className="form-control" name="AgentID" value={formData.AgentID || ''} onChange={handleChange} />
                </div>
                <div style={{ flex: 1 }} className="form-row">
                  <label>Full Name:</label>
                  <input className="form-control" name="FullName" value={formData.FullName || ''} onChange={handleChange} />
                </div>
              </div>
              <div style={{ marginTop: '15px', display: 'flex', gap: '40px', }}>
                <div style={{ flex: 1 }} className="form-row">
                  <label>Contact Number:</label>
                  <input className="form-control" name="ContactNumber" value={formData.ContactNumber || ''} onChange={handleChange} />
                </div>
                <div style={{ flex: 1 }} className="form-row">
                  <label>Email:</label>
                  <input className="form-control" name="Email" value={formData.Email || ''} onChange={handleChange} />
                </div>
              </div>
              <div style={{ marginTop: '15px', display: 'flex', gap: '40px', }}>
                <div style={{ flex: 1 }} className="form-row">
                  <label>Password:</label>
                  <input className="form-control" name="Password" value={formData.Password || ''} onChange={handleChange} />
                </div>
                <div style={{ flex: 1 }} className="form-row">
                  <label>Role ID:</label>
                  <input className="form-control" name="RoleID" value={formData.RoleID || ''} onChange={handleChange} />
                </div>
              </div>
              <div style={{ marginTop: '15px', display: 'flex', gap: '40px', }}>
                <div style={{ flex: 1 }} className="form-row">
                  <label>Role:</label>
                  <input className="form-control" name="Role" value={formData.Role || ''} onChange={handleChange} />
                </div>
                <div style={{ flex: 1 }} className="form-row">
                  <label>Limit:</label>
                  <input className="form-control" name="Moneylimit" value={formData.Moneylimit || ''} onChange={handleChange} />
                </div>
              </div>
              <div style={{ marginTop: '15px', display: 'flex', gap: '40px', justifyContent: 'space-evenly' }}>
                <div style={{ flex: 1 }} className="form-row">
                  <label>Address:</label>
                  <input className="form-control" name="Address" value={formData.Address || ''} onChange={handleChange} />
                </div>
                <div style={{ flex: 1 }} className="form-row">
                  <label>Aadhar Number:</label>
                  <input className="form-control" name="AadharNumber" value={formData.AadharNumber || ''} onChange={handleChange} />
                </div>
              </div>
              <div style={{ marginTop: '15px', width: '48%' }}>
                <div style={{ flex: 1 }} className="form-row">
                  <label>Pan Number:</label>
                  <input className="form-control" name="PanNumber" value={formData.PanNumber || ''} onChange={handleChange} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button style={{width:'15rem'}} className="btn btn-success my-3 mx-3" onClick={SetAgent}>Update</button>
              </div>
 
            </div>
          </td>
        </tr>
      )}
    </>
  );
 
  return (
    <div style={{ height: '100vh', backgroundColor: '#f5f7fe' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px' }}>
        <h3>Update Agent</h3>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: '10px',
            backgroundColor: 'white',
            position: 'relative',
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
            onChange={SearchAgent}
          />
        </div>
      </div>
      <div className='table-responsive' style={{ height: 'auto', width: '78vw', margin: 'auto', borderRadius: '15px', backgroundColor: 'white', boxShadow: '1px 1px 3px 1px' }}>
        <table className='table'>
          <thead className='table-light'>
            <tr>
              <th style={{ textAlign: "center" }}>Action</th>
              <th>ID</th>
              <th>Agent ID</th>
              <th>Full Name</th>
              <th>Contact Number</th>
              <th>Email</th>
              <th>Password</th>
              <th>RoleID</th>
              <th>Role</th>
              <th>Limit</th>
              <th>Address</th>
              <th>Aadhar Number</th>
              <th>Pan Number</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(showAgent) && showAgent.length > 0 ? (
              <Pagination
                data={showAgent}
                perPageItems={10}
                func={renderRow}
                searchparam={["FullName", "AgentID", "Email", "ContactNumber"]}
                searchword={""}
                useeffectactive={showAgent}
              />
            ) : (
              <tr>
                <td colSpan="14">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
 
export default Page;
 