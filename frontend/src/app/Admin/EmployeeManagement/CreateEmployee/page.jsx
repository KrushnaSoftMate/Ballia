'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Admin } from '@/app/AdminContext/AdminManageMent'
const CreateEmployee = () => {
  const types = useContext(Admin)
  const { EmployeeManagement, Roles, DepartmentHandler } = types
  const formref=useRef(null)
  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    Password: '',
    RoleID: '',
    Role: ''
  });

  const [Role, SetRole] = useState([])
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    let data = await Roles('View', null)
    SetRole(data)
  }

  const handleChange = async (e) => {
    const {  value ,name } = e.currentTarget;
    const safename =  /^[a-zA-Z/\s]*$/; 
  
    if (!safename.test(value) && name === 'FullName') {
      alert("Only Safe charachters are allowed.");
      return;
    }
   if (e.target.id === 'Role') {
      let obj = JSON.parse(e.target.value)
      formData.Role = obj.Designation;
      formData.RoleID = obj.RoleID
    }
    else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };


  const Submit = async (e) => {
    e.preventDefault()
    let data = await EmployeeManagement('Create', formData)
    if (data) {
      window.location.href = '/AdminDashboard/EditViewEmp'
      formref.current.reset()
      setFormData({
        FullName: '',
        Email: '',
        Password: '',
        RoleID: '',
        Role: ''
      });
    }
  }


  return (
    <div style={{  backgroundColor:" rgb(242, 244, 247)" , height:"110vh" }}>
         <h5 style={{ padding: '20px' }}>Create Employee</h5>
      <div className="card m-3" style={{ width: '400px' , justifySelf:"center"}}>
        <div className="card-body">
          <form ref={formref} onSubmit={Submit} >
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="FullName"
                value={formData.FullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" hidden>Profile Picture</label>
              <input
                type="text"
                className="form-control"
                name="ProfilePic"
                value={formData.ProfilePic}
                onChange={handleChange}
                hidden
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                className="form-control"
                id='Role'
                onChange={(e) => handleChange(e)}>
                <option value={false}>Selected Role</option>
                {Role.map((e) => {
                  return (
                    <option key={e.RoleID} value={JSON.stringify(e)}>
                      {e.Designation}
                    </option>
                  )
                })}
              </select>
            </div>
            <div style={{ display: "grid", justifyContent: "center" }}>
              <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#e73d26", border: "none" }}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateEmployee